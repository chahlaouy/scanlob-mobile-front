import { CategoryModule } from './../../layouts/categories/categories.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostProductsPageRoutingModule } from './lost-products-routing.module';

import { LostProductsPage } from './lost-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostProductsPageRoutingModule,
    CategoryModule
  ],
  declarations: [LostProductsPage]
})
export class LostProductsPageModule {}
