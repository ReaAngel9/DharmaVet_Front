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
  
  editProductFromCart(id: any, ammount: any) {
    return this.httpClient.post(this.url + '/sales/edit', {
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

  sendSaleFromCart(paymentMethod: string){
    return this.httpClient.post(this.url + '/sales/new', {'payment_method': paymentMethod});
  }

  getSales() {
    return this.httpClient.get(this.url + '/sales');
  }

  generateProduct(name: string, price: number, description: string, barcodeid: number){
    return this.httpClient.post(this.url + '/products/new', { name: name, price: price, description: description, barcodeid:barcodeid, responseType: 'blob'});
  }

  deleteProduct(id: number){
    return this.httpClient.delete(this.url + '/products/' + id);
  }

  editProduct(id: number, data: any){
    return this.httpClient.put(this.url + '/products/' + id, data);
  }

  getBarcode(id: number){
    return this.httpClient.get(this.url + '/products/barcode/' + id, { responseType: 'blob' });
  }

  getPrinters(){
    return this.httpClient.get('localhost:8000/printers');
  }

  printTicket(){
    return this.httpClient.post('localhost:5656/command/Seafon', JSON.stringify(['Hola mundo']));
  }

}
