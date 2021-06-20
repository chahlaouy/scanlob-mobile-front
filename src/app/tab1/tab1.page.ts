import { CategoryModel } from './../models/category-model';
import { LostProductModel } from './../models/lost-product-model';
import { ProductModel } from './../models/product-model';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController, MenuController, ModalController} from "@ionic/angular";

@Component({ 
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  public listArrayOfPopularProducts: ProductModel[];
  public listArrayOfLostProducts: LostProductModel[];
  public listArrayOfRecentProducts: ProductModel[];

  filterCount = 0;
  filteredCategoryList: any[] = [];
  categories: CategoryModel[] = [];

  constructor(
    private productServ: ProductService, 
    private loadingController: LoadingController,
    private toastController: ToastController,
    private menuController: MenuController) { }
    async ngOnInit() {
      const loader = await this.loadingController.create({
          message: 'Chargement du produits..',
          spinner: "bubbles",
          animated: true
      });
      await loader.present().then();
      this.productServ.getDiversProducts().subscribe(async (products) => {
          await loader.dismiss().then();
            this.listArrayOfPopularProducts = [...products.popularProd];
            this.listArrayOfLostProducts = [...products.lostProduct];
            this.listArrayOfRecentProducts = [...products.recentProduct];

      }, async (err) => {
          await loader.dismiss().then();
          console.log(err);
      })
      this.categories = await this.productServ.getAllCategories().toPromise();
  }


  loadingSpinner() {
    this.loadingController.create({
        message: "Chargement ...",
        animated: true,
        spinner: "crescent",
        backdropDismiss: false,
        showBackdrop: true
    }).then(el => el.present());
}




sort(resultData: { role: string, data: any }) {
  const {role, data} = {...resultData};
  if (role === 'cancel') {
      return;
  } else if (role === 'sort') {

      // Check the type of sorting asked by the customer
      if (data === 'title-asc') {
          this.listArrayOfPopularProducts.sort((a, b) => {
              const x = a.name.toLowerCase();
              const y = b.name.toLowerCase();

              if (x < y) {
                  return -1;
              }
              if (x > y) {
                  return 1;
              }
              return 0;
          });
      }

      else if (data === 'title-desc') {
          this.listArrayOfPopularProducts.sort((a, b) => {
              const x = a.name.toLowerCase();
              const y = b.name.toLowerCase();

              if (x > y) {
                  return -1;
              }
              if (x < y) {
                  return 1;
              }
              return 0;
          });
      }

      else if (data === 'price-asc') {
          this.listArrayOfPopularProducts.sort((a, b) => {
              // @ts-ignore
              return a.price - b.price;   // Low To High
          });
      }

      else if (data === 'price-desc') {
          this.listArrayOfPopularProducts.sort((a, b) => {
              // @ts-ignore
              return b.price - a.price;   // High To Low
          });
      }
  }


}

openFilter() {
  this.menuController.enable(true, 'filter').then();
  this.menuController.open('filter').then();
}

categoryFilter(ev: {name: string, selected: boolean}) {

  // If the user clicked the filter for the first time and nothing is selected
   if(ev.selected && this.filterCount === 0) {
       this.filteredCategoryList.push(ev.name);
       this.filterCount++;
       this.listArrayOfPopularProducts = this.listArrayOfPopularProducts.filter(p => p.category.name === ev.name);
   }
     // If the category selected is not present in the list of items
   else if (ev.selected && this.filterCount >=1) {
       const newArray = [...this.listArrayOfPopularProducts];
       this.filterCount++;

       if (!this.filteredCategoryList.includes(ev.name)) {
           this.filteredCategoryList.push(ev.name);

           const product: ProductModel[] = newArray.filter(p => p => p.category.name === ev.name);
           let i;

           product.forEach(p => {
               i = this.listArrayOfPopularProducts.findIndex(prod => prod.id === p.id);

               // If product is present in the array
               if (i !== -1) {
                   return;
               } else  {
                   this.listArrayOfPopularProducts = this.listArrayOfPopularProducts.concat(p);
               }
           });
       } else {
           return;
       }
   } // END OF ELSE IF

  else if (!ev.selected && this.filterCount >= 1) {
       const newArray = [...this.listArrayOfPopularProducts];
       this.filterCount--;

       // Remove the category from the filter list array
       this.filteredCategoryList = this.filteredCategoryList.filter(el => el !== ev.name);

       if (this.filteredCategoryList.length > 0) {
           this.listArrayOfPopularProducts = [];
           this.filteredCategoryList.forEach(el => {
               this.listArrayOfPopularProducts = this.listArrayOfPopularProducts.concat(
                   newArray.filter(p => p.category.name === el)
               );
           })
       }

       // Check if the filter count has reached 0, that means no filter is present now
       if (this.filterCount === 0) {
           this.listArrayOfPopularProducts = [...this.listArrayOfPopularProducts];
       }
   }

}

}
