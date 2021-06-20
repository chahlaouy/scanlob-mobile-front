import { ProductModel } from './../models/product-model';
import { CartModel } from './../models/cart-model';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public cart: CartModel;
  constructor(
    private cartService: CartService,
    private loadingController: LoadingController
  ) {}

  ngOnInit(){
    this.cartService.cartData.subscribe(data => {
      this.cart = data;
    });
  }

  addProduct(product: ProductModel) {
    this.cartService.addToCart(product)
  }
  subProduct(product: ProductModel, i: any) {
    if (product.in_cart === 1){
      this.cartService.removeFromCart(product)
    }
    else{
      console.log(product)
      let minus = product.in_cart - 1
      this.cartService.updateQuantity(i, minus)
    }
  }
  loadingSpinner() {
    this.loadingController
      .create({
        message: 'Chargement ...',
        animated: true,
        spinner: 'crescent',
        backdropDismiss: false,
        showBackdrop: true,
      })
      .then((el) => el.present());
  }

}
