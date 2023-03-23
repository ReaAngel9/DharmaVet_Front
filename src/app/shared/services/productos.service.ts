import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get(this.url + '/products');
  }
}
