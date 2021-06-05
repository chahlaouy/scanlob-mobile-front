import { LostProductModel } from './../models/lost-product-model';
import { ProductModel } from './../models/product-model';

import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  public listArrayOfPopularProducts: ProductModel[];
  public listArrayOfLostProducts: LostProductModel[];
  public listArrayOfRecentProducts: ProductModel[];

  constructor(
    private productServ: ProductService, 
    private loadingController: LoadingController,
    private toastController: ToastController) { }
    async ngOnInit() {
      const loader = await this.loadingController.create({
          message: 'Chargement du produits..',
          spinner: "bubbles",
          animated: true
      });
      await loader.present().then();
      this.productServ.getDiversProducts().subscribe(async (products) => {
          await loader.dismiss().then();
            this.listArrayOfPopularProducts = [...products.popularProd];
            this.listArrayOfLostProducts = [...products.lostProduct];
            this.listArrayOfRecentProducts = [...products.recentProduct];

      }, async (err) => {
          await loader.dismiss().then();
          console.log(err);
      })
  }


  loadingSpinner() {
    this.loadingController.create({
        message: "Chargement ...",
        animated: true,
        spinner: "crescent",
        backdropDismiss: false,
        showBackdrop: true
    }).then(el => el.present());
}

}
