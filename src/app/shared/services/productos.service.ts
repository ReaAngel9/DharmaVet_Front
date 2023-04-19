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

  deleteProductFromCart(id: any){
    return this.httpClient.delete(this.url + '/sales/remove', { body: { 'id': id } });
  }

  deleteCart(){
    return this.httpClient.delete(this.url + '/sales/clean');
  }

  sendSaleFromCart(total : number, paymentMethod: string, percentageDiscount: number){
    return this.httpClient.post(this.url + '/sales/new', { 'total': total, 'payment_method': paymentMethod, 'percentage_discount': percentageDiscount });
  }

  getSales() {
    return this.httpClient.get(this.url + '/sales');
  }

  generateProduct(name: string, price: number, description: string){
    return this.httpClient.post(this.url + '/products/new', { name: name, price: price, description: description});
  }
}
