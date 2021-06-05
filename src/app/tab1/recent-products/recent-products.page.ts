import { ProductModel } from './../../models/product-model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.page.html',
  styleUrls: ['./recent-products.page.scss'],
})
export class RecentProductsPage implements OnInit {
  public currentPage: number = 1;
  public listProds: any;
  public listArrayOfRecentProducts: ProductModel[];

  constructor(
    private productServ: ProductService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Chargement du produits..',
      spinner: 'bubbles',
      animated: true,
    });
    await loader.present().then();
    this.productServ.getAllProducts().subscribe(
      async (products) => {
        await loader.dismiss().then();
        this.listArrayOfRecentProducts = [...products.data];
      },
      async (err) => {
        await loader.dismiss().then();
        console.log(err);
      }
    );
  }

  // load more data

  async loadMoreData(ev: any) {
    const toast = await this.toastController.create({
      message: 'No More Products',
      animated: true,
      duration: 2000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          icon: 'close',
        },
      ],
    });

    if (ev == null) {
      this.currentPage = 1;
    } else {
      this.currentPage = this.currentPage + 1;
      console.log(this.currentPage);
      this.productServ.getAllProducts(this.currentPage).subscribe(
        async (prods: any) => {
          this.listProds = this.listArrayOfRecentProducts.concat(prods.data);
          this.listArrayOfRecentProducts = [...this.listProds];

          if (ev !== null) {
            ev.target.complete();
          }

          if (prods.length < 6) {
            await toast.present().then();
            ev.target.disabled = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
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
