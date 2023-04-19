import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/shared/services/productos.service';

// export interface SalesData {
//   name: string;
//   id: number;
//   price: number;
//   description: string;
//   ammount: number;
// }

const ELEMENT_DATA: never[] = [
  // {id: 1, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 1},
  // {id: 2, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 2},
  // {id: 3, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 3},
  // {id: 4, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 4},
  // {id: 5, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 5},
  // {id: 6, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 1},
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
  dataSource: any = [];
  columnsSchema: any = COLUMNS_SCHEMA;


  amountActive: boolean = false;
  subtotal: number = 0;
  descuento: number = 0;
  total: number = 0;
  ammount: any = 0;
  update: boolean = false;
  editAmmount: any = 0;
  id: number = 0;

  shoppingcartForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private productsService: ProductosService) {
    this.shoppingcartForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required, Validators.min(0)],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.productsService.getCart().subscribe((data: any) => {
      this.dataSource = data;
    });
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

  edit(element: any, ammount: any){
    if (this.id == element){
      this.id = -1;
      this.productsService.addProductToCart(element, ammount).subscribe((data: any) => {
        this.ngOnInit();
      });
      this.ammount = 0;
    }else{
      this.id = element;
    }
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
