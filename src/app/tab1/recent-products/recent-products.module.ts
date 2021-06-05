import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentProductsPageRoutingModule } from './recent-products-routing.module';

import { RecentProductsPage } from './recent-products.page';
import { CategoryModule } from 'src/app/layouts/categories/categories.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentProductsPageRoutingModule,
    CategoryModule
  ],
  declarations: [RecentProductsPage]
})
export class RecentProductsPageModule {}
