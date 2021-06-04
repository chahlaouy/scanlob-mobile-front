import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.backendUrl

  constructor(private httpClient : HttpClient) { }

  getAllProducts(pageNumber: number = 1){
    this.httpClient.get(`${this.url}/products?page=${pageNumber}&per_page=10`).subscribe(data => {
      console.log(data)
    })
  }
}
