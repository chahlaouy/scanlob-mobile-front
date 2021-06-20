import { FilterComponent } from './filter.component';

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
    FilterComponent,
  ],
  exports: [
    FilterComponent,
  ]
})
export class FilterModule { }