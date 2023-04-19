import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url: string = environment.apiUrl;
  shoppingCart: any = [];

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get(this.url + '/products');
  }

  getProductsById(id: any) {
    return this.httpClient.get(this.url + '/products/' + id);
  }

  addProductToCart(id: any, ammount: any) {
    return this.httpClient.post(this.url + '/sales/add', {
      id: id,
      ammount: ammount
    });
  }

  getCart(){
    return this.httpClient.get(this.url + '/sales/cart');
  }

  getSales() {
    return this.httpClient.get(this.url + '/sales');
  }
}
