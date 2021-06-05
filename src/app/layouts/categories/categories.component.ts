import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  constructor(private productServ: ProductService) { }

  ngOnInit() {}
  
  getAllProducts(){
    this.productServ.getAllProducts().subscribe(data => {
      data.forEach(p => {
      })
    })
  }
}
