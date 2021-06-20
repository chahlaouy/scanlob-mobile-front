import { ProductModel } from './../models/product-model';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CartModel } from './../models/cart-model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = environment.backendUrl;

  private cartDataArray: CartModel = {
    count: 0,
    product: [],
  };

  private cartData$ = new BehaviorSubject<CartModel>({ count: 0, product: [] });
  private totalAmount = 0;
  private totalAmount$ = new BehaviorSubject<number>(0);

  // npm install @ionic/storage   - To install the Storage Package

  constructor(
    private httpClient: HttpClient,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage: Storage,
    private router: Router
  ) {
    this.totalAmount = 0;
    this.storage.create();
    this.storage.get('cart').then((data) => {
      if (data) {
        this.cartDataArray = data;
        this.cartData$.next(this.cartDataArray);
        // TODO Calculate Total
      }
    });
  }

  async addToCart(product: ProductModel) {
    const loader = await this.loadingController.create({
      message: 'Ajout au panier..',
      animated: true,
      spinner: 'circles',
      backdropDismiss: false,
      showBackdrop: true,
    });

    const alert = await this.alertController.create({
      header: 'Mis à jour de panier',
      buttons: [
        {
          text: 'Continuer',
          role: 'cancel',
          cssClass: 'continue',
          handler: () => {
            console.log('Product Added');
          },
        },
        {
          text: 'Voir le panier',
          cssClass: 'bg-purple-500',
          handler: () => {
            this.router.navigateByUrl('/tabs/tab2').then();
          },
        },
      ],
      animated: true,
      message: 'Produit ajouté au panier',
      backdropDismiss: false,
      cssClass: 'add-product',
    });

    const toast = await this.toastController.create({
      message: 'Seulement 5 autorisés dans le panier',
      header: 'Quantité maximale atteinte',
      duration: 5000,
      position: 'bottom',
      animated: true,
      color: 'warning',
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          text: 'Ok',
        },
      ],
    });

    await loader.present().then();

    // When the cart is not completely empty
    if (this.cartDataArray.count !== 0) {
      // Calculate Index
      const index = this.cartDataArray.product.findIndex(
        (p) => p.id === product.id
      );

      // If there is a match, that means the index is not equal to -1

      if (index > -1) {
        // Limit the max purchasable quantity to 5 per product per order
        if (this.cartDataArray.product[index].in_cart >= 5) {
          this.cartDataArray.product[index].in_cart = 5;
          //TODO Calculate Total
          this.storage.set('cart', { ...this.cartDataArray }).then();
          await loader.dismiss().then();
          await toast.present().then();
        } else {
          this.cartDataArray.product[index].in_cart += 1;
          //TODO Calculate Total
          this.storage.set('cart', { ...this.cartDataArray }).then();
          await loader.dismiss().then();
          await alert.present().then();
        }
        this.cartData$.next(this.cartDataArray);
      }

      // When the product is not in cart array but the cart is not empty
      else {
        this.cartDataArray.product.push(product);
        const newProductIndex = this.cartDataArray.product.findIndex(
          (p) => p.id === product.id
        );
        this.cartDataArray.product[newProductIndex].in_cart = 1;
        // TODO Calculate Total
        await loader.dismiss().then();
        await alert.present().then();
        this.cartDataArray.count = this.cartDataArray.product.length;
        this.storage.set('cart', { ...this.cartDataArray }).then();
        this.cartData$.next(this.cartDataArray);
      }
    }

    // When the cart is absolutely empty
    else {
      this.cartDataArray.product.push({ ...product, in_cart: 1 });
      this.cartDataArray.count = this.cartDataArray.product.length;
      // TODO Calculate Total
      this.storage.set('cart', { ...this.cartDataArray }).then();
      await loader.dismiss().then();
      await alert.present().then();
      this.cartData$.next(this.cartDataArray);
    }
  }

  removeFromCart(product: ProductModel) {
    this.cartDataArray.product = this.cartDataArray.product.filter(
      (p) => { 
        return p.id !== product.id 
      }
    );
    this.cartDataArray.count = this.cartDataArray.product.length;
    this.calculateTotal();

    this.cartData$.next(this.cartDataArray);
    this.totalAmount$.next(this.totalAmount);
    this.storage.set('cart', { ...this.cartDataArray }).then();
    return this.cartDataArray.product;
  }

  private calculateTotal() {
    this.totalAmount = 0;
    if (this.cartDataArray.product.length === 0) {
      this.totalAmount = 0;
      this.totalAmount$.next(this.totalAmount);
      return;
    }

    this.cartDataArray.product.forEach((p) => {
      this.totalAmount += parseInt(p.price, 10) * p.in_cart;
    });

    this.totalAmount$.next(this.totalAmount);
  }

  updateQuantity(indexOfProduct: number, newInCartValue: number) {
    this.cartDataArray.product[indexOfProduct].in_cart = newInCartValue;
    this.calculateTotal();
    this.storage.set('cart', { ...this.cartDataArray }).then();
    this.cartData$.next(this.cartDataArray);
    this.totalAmount$.next(this.totalAmount);
  }

  private emptyCart() {
    this.cartDataArray = {
      count: 0,
      product: [],
    };
    this.calculateTotal();
    this.cartData$.next(this.cartDataArray);
  }

  get cartData(): Observable<CartModel> {
    return this.cartData$.asObservable();
  }

  get cartTotal(): Observable<number> {
    return this.totalAmount$.asObservable();
  }
}
