import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentProductsPage } from './recent-products.page';

const routes: Routes = [
  {
    path: '',
    component: RecentProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentProductsPageRoutingModule {}
