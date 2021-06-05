import { ProductModel } from './../../models/product-model';
import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  cart = 0;
  @Input() product: ProductModel
  constructor() { 
   
  }

  ngOnInit() {
    console.log(this.product)
  }

  addToCart(){
    this.cart ++;
  }
}
