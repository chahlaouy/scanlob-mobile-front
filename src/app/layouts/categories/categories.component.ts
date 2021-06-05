import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  @Input() active: String
  constructor(private productServ: ProductService) { }

  ngOnInit() {}
  
  goToHomeProducts(){
    this.productServ.getAllProducts().subscribe(data => {
      data.forEach(p => {
      })
    })
  }
  
  goToPopularProducts(){
    this.productServ.getAllProducts().subscribe(data => {
      data.forEach(p => {
      })
    })
  }
  
  goToRecentProducts(){
    this.productServ.getAllProducts().subscribe(data => {
      data.forEach(p => {
      })
    })
  }
  
  goToLostProducts(){
    this.productServ.getAllProducts().subscribe(data => {
      data.forEach(p => {
      })
    })
  }
}
