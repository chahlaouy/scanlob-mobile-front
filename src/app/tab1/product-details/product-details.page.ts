
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController} from "@ionic/angular";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
    sliderImages = [
      'https://i.pravatar.cc/500',
      'https://i.pravatar.cc/500',
      'https://i.pravatar.cc/500',
      'https://i.pravatar.cc/500',
      'https://i.pravatar.cc/500'
  ]

  sliderOptions = {
      autoplay: {
          delay: 2000
      },
      loop: true
  }

  private product;

  constructor(
    private productServ: ProductService, 
    private loadingController: LoadingController,
    private toastController: ToastController) { }

    async ngOnInit() {
      const loader = await this.loadingController.create({
          message: 'Chargement du produit..',
          spinner: "bubbles",
          animated: true
      });
      await loader.present().then();
      this.productServ.getProductById(1).subscribe(async (product) => {
          await loader.dismiss().then();
          this.product = product;
      }, async (err) => {
          await loader.dismiss().then();
          console.log(err);
      })

  }

}
