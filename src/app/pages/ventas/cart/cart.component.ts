import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedTitleCart: string[] = ['Nombre', 'Precio', 'Descripción', 'Cantidad'];

  cart: any = [
    // {
    //   id: 1,
    //   name: 'Hydrogen',
    //   price: 1.0079,
    //   description: 'H',
    //   ammount: 1
    // }
  ];

  constructor(private productsService: ProductosService, @Inject(MAT_DIALOG_DATA) public data: {i: any}) { }

  ngOnInit(): void {
    this.productsService.getSales().subscribe((data: any) => {
      this.cart = [];
      for(const prop in data.sales[this.data.i].cart) {
        this.cart.push(data.sales[this.data.i].cart[prop]);
      }
      data.sales[this.data.i].cart;
    });
  }

}
