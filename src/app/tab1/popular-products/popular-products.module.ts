import { CategoryModule } from './../../layouts/categories/categories.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularProductsPageRoutingModule } from './popular-products-routing.module';

import { PopularProductsPage } from './popular-products.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularProductsPageRoutingModule,
    CategoryModule
  ],
  declarations: [PopularProductsPage]
})
export class PopularProductsPageModule {}
