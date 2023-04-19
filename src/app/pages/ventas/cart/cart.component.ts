import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedTitleCart: string[] = ['Nombre', 'Precio', 'Descripción', 'Cantidad'];

  cart = [
    {
      id: 1,
      name: 'Hydrogen',
      price: 1.0079,
      description: 'H',
      ammount: 1
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
