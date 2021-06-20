import { FilterModule } from '../layouts/filter/filter.module';
import { CategoryModule } from './../layouts/categories/categories.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { Tab1Page } from './tab1.page';


import { CardComponent } from '../layouts/card/card.component'



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    CategoryModule,
    FilterModule
  ],
  declarations: [Tab1Page, CardComponent]
})
export class Tab1PageModule {}
