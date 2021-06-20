import { ProductModel } from './../../models/product-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
    sliderImages = [
      'https://img01.ztat.net/article/spp-media-p1/624cde24913738cf80160cc8a46ad4c4/48ad8b66c84e4268aa62bb4438a2bb06.jpg?imwidth=1800',
      'https://img01.ztat.net/article/spp-media-p1/bfcaaf2772143a55ad29998037023f85/92729706497346a2a35b32dc384f8718.jpg?imwidth=1800',
      'https://img01.ztat.net/article/spp-media-p1/6d1962428f7f373c99c31cf5914aaed7/dbf9580544da4871a5b99a1ce189c351.jpg?imwidth=1800',
  ]

  sliderOptions = {
      autoplay: {
          delay: 2000
      },
      loop: true
  }

  product: ProductModel;
    showData = false;


    constructor(private route: ActivatedRoute, private cartService: CartService) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: { product: ProductModel }) => {
            this.product = data.product;
            this.showData = true;
        });
    }

    addProduct(product: ProductModel) {
        this.cartService.addToCart(product);
    }

}
