import { CategoriesComponent } from 'src/app/layouts/categories/categories.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
  ],
  declarations: [
    CategoriesComponent,
  ],
  exports: [
    CategoriesComponent,
  ]
})
export class CategoryModule { }