import { CategoriesComponent } from 'src/app/layouts/categories/categories.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    CategoriesComponent,
  ],
  exports: [
    CategoriesComponent,
  ]
})
export class CategoryModule { }