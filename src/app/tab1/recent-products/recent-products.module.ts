import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentProductsPageRoutingModule } from './recent-products-routing.module';

import { RecentProductsPage } from './recent-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentProductsPageRoutingModule
  ],
  declarations: [RecentProductsPage]
})
export class RecentProductsPageModule {}
