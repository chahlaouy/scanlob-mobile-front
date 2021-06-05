import { ProductModel } from './../../models/product-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


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

  product: ProductModel;
    showData = false;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: { product: ProductModel }) => {
            this.product = data.product;
            this.showData = true;
        });
    }

}
