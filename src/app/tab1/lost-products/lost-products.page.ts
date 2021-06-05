import { LostProductModel } from './../../models/lost-product-model';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-lost-products',
  templateUrl: './lost-products.page.html',
  styleUrls: ['./lost-products.page.scss'],
})
export class LostProductsPage implements OnInit {

  public currentPage: number = 1;
  public listProds: any
  public listArrayOfLostProducts: any[]

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
            this.listArrayOfLostProducts = [...products.data];

      }, async (err) => {
          await loader.dismiss().then();
          console.log(err);
      })
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
                icon: 'close'
            }
        ]
    });

    if (ev == null) {
        this.currentPage = 1;
    } else {
        this.currentPage = this.currentPage + 1;
        console.log(this.currentPage)
        this.productServ.getAllProducts(this.currentPage).subscribe(async (prods: any) => {
            this.listProds = this.listArrayOfLostProducts.concat(prods.data);
            this.listArrayOfLostProducts = [...this.listProds];

            if (ev !== null) {
                ev.target.complete();
            }

            if (prods.length < 6) {
                await toast.present().then();
                ev.target.disabled = true;
            }
        }, (err) => {
            console.log(err);
        });

    }
  }

}
