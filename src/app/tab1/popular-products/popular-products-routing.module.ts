import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularProductsPage } from './popular-products.page';

const routes: Routes = [
  {
    path: '',
    component: PopularProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularProductsPageRoutingModule {}
