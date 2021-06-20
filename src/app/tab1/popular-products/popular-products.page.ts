import { CartModel } from './../../models/cart-model';
import { MenuController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from './../../models/product-model';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.page.html',
  styleUrls: ['./popular-products.page.scss'],
})
export class PopularProductsPage implements OnInit {
  public currentPage: number = 1;
  public listProds;
  public listArrayOfPopularProducts: ProductModel[];

  // public cart: CartModel;

  filterCount = 0;
  filteredCategoryList: any[] = [];
  categories: CategoryModel[] = [];

  constructor(
    private productServ: ProductService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private menuController: MenuController,
    private cartService: CartService
  ) {}
  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Chargement du produits..',
      spinner: 'bubbles',
      animated: true,
    });
    await loader.present().then();
    this.productServ.getAllProducts().subscribe(
      async (products) => {
        await loader.dismiss().then();
        this.listProds = [...products.data];
        this.listArrayOfPopularProducts = [...products.data];
      },
      async (err) => {
        await loader.dismiss().then();
        console.log(err);
      }
    );
    
    this.categories = await this.productServ.getAllCategories().toPromise();
  }

  // load more data

  async loadMoreData(ev: any) {
    const toast = await this.toastController.create({
      message: 'No More Products',
      animated: true,
      duration: 2000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          icon: 'close',
        },
      ],
    });

    if (ev == null) {
      this.currentPage = 1;
    } else {
      this.currentPage = this.currentPage + 1;
      console.log(this.currentPage);
      this.productServ.getAllProducts(this.currentPage).subscribe(
        async (prods: any) => {
          this.listProds = this.listArrayOfPopularProducts.concat(prods.data);
          this.listArrayOfPopularProducts = [...this.listProds];

          if (ev !== null) {
            ev.target.complete();
          }

          if (prods.length < 6) {
            await toast.present().then();
            ev.target.disabled = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  loadingSpinner() {
    this.loadingController
      .create({
        message: 'Chargement ...',
        animated: true,
        spinner: 'crescent',
        backdropDismiss: false,
        showBackdrop: true,
      })
      .then((el) => el.present());
  }

  openFilter() {
    this.menuController.enable(true, 'filter').then();
    this.menuController.open('filter').then();
  }

  categoryFilter(ev: { name: string; selected: boolean }) {
    // If the user clicked the filter for the first time and nothing is selected
    if (ev.selected && this.filterCount === 0) {
      this.filteredCategoryList.push(ev.name);
      this.filterCount++;
      this.listArrayOfPopularProducts = this.listArrayOfPopularProducts.filter(
        (p) => p.category.name === ev.name
      );
    }
    // If the category selected is not present in the list of items
    else if (ev.selected && this.filterCount >= 1) {
      const newArray = [...this.listProds];

      this.filterCount++;

      if (!this.filteredCategoryList.includes(ev.name)) {
        this.filteredCategoryList.push(ev.name);

        const product: ProductModel[] = newArray.filter(
          (p) => p.category.name === ev.name
        );
        let i;

        product.forEach((p) => {
          i = this.listArrayOfPopularProducts.findIndex(
            (prod) => prod.id === p.id
          );

          // If product is present in the array
          if (i !== -1) {
            return;
          } else {
            this.listArrayOfPopularProducts =
              this.listArrayOfPopularProducts.concat(p);
          }
        });
      } else {
        return;
      }
    } // END OF ELSE IF
    else if (!ev.selected && this.filterCount >= 1) {
      const newArray = [...this.listProds];
      this.filterCount--;

      // Remove the category from the filter list array
      this.filteredCategoryList = this.filteredCategoryList.filter(
        (el) => el !== ev.name
      );

      if (this.filteredCategoryList.length > 0) {
        this.listArrayOfPopularProducts = [];
        this.filteredCategoryList.forEach((el) => {
          this.listArrayOfPopularProducts =
            this.listArrayOfPopularProducts.concat(
              newArray.filter((p) => p.category.name === el)
            );
        });
      }

      // Check if the filter count has reached 0, that means no filter is present now
      if (this.filterCount === 0) {
        this.listArrayOfPopularProducts = [...this.listProds];
      }
    }
  }
  



}
