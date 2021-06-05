import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolverService } from '../services/product-resolver.service';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'product-details/:id',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule),  
    resolve: { product: ProductResolverService }
  },
  {
    path: 'popular-products',
    loadChildren: () => import('./popular-products/popular-products.module').then( m => m.PopularProductsPageModule)
  },
  {
    path: 'recent-products',
    loadChildren: () => import('./recent-products/recent-products.module').then( m => m.RecentProductsPageModule)
  },
  {
    path: 'lost-products',
    loadChildren: () => import('./lost-products/lost-products.module').then( m => m.LostProductsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class Tab1PageRoutingModule {}
