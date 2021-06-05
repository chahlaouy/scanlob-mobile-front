import { CategoryModel } from './../models/category-model';
import { ProductModel } from './../models/product-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  getAllProducts(pageNumber: number = 1): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(
      `${this.url}/products?page=${pageNumber}&per_page=10`
    );
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${this.url}/products/${id}`);
  }

  searchProductsByKeyWord(keyword: string): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(
      `${this.url}/products?keyword=${keyword}`
    );
  }
  getAllCategories() {
    return this.httpClient.get<CategoryModel[]>(`${this.url}/Categories`).toPromise();
  }

  getCategoryById(): Observable<CategoryModel> {
    return this.httpClient.get<CategoryModel>(`${this.url}/Categories`);
  }
}
