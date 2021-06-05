import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostProductsPage } from './lost-products.page';

const routes: Routes = [
  {
    path: '',
    component: LostProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostProductsPageRoutingModule {}
