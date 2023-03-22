import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

// export interface SalesData {
//   name: string;
//   id: number;
//   price: number;
//   description: string;
//   ammount: number;
// }

const ELEMENT_DATA = [
  {id: 1, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 1},
  {id: 2, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 2},
  {id: 3, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 3},
  {id: 4, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 4},
  {id: 5, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 5},
  {id: 6, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 1},
];

const COLUMNS_SCHEMA = [
  {
    key: "id",
    type: "number",
    label: "ID"
  },
  {
    key: "name",
    type: "text",
    label: "Nombre"
  },
  {
      key: "price",
      type: "number",
      label: "Precio"
  },
  {
    key: "description",
    type: "text",
    label: "Descripción"
  },
  {
    key: "ammount",
    type: "number",
    label: "Cantidad"
  },
  {
    key: "amountActive",
    type: "text",
    label: ""
  },
];

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'ammount', 'actions'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource: any = ELEMENT_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;
  
  
  amountActive: boolean = false;
  subtotal: number = 0;
  descuento: number = 0;
  total: number = 0;
  
  shoppingcartForm: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router) {
    this.shoppingcartForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required, Validators.min(0)],
      description: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    // console.log(this.subtotal); 
  }
  
  tarjeta(){
    this.subtotal = this.dataSource.reduce((acc: any, item: any) => acc + item.price * item.ammount, 0);
    this.descuento = 0;
    this.total = this.subtotal - this.descuento;
  }
  
  efectivo(){
    this.subtotal = this.dataSource.reduce((acc: any, item: any) => acc + item.price * item.ammount, 0);
    this.descuento = this.subtotal * 0.04;
    this.total = this.subtotal - this.descuento;
  }

  edit(element: any){
    console.log(element);    
  }

  delete(id: number){
    this.dataSource = this.dataSource.filter((item: any) => item.id !== id);
  }

  cancelar(){
    this.router.navigate(['/home']);
  }

  pagar(){
    // Agregar a la base de datos
    this.router.navigate(['/home']);
  }

}
