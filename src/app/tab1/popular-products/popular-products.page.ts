import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from './../../models/product-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.page.html',
  styleUrls: ['./popular-products.page.scss'],
})
export class PopularProductsPage implements OnInit {

  public listArrayOfPopularProducts: ProductModel[]

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
      this.productServ.getAllProducts().subscribe(async (products) => {
          await loader.dismiss().then();
            this.listArrayOfPopularProducts = [...products];

      }, async (err) => {
          await loader.dismiss().then();
          console.log(err);
      })
  }

}
