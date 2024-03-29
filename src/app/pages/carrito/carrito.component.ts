import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/shared/services/productos.service';


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
  dataSource: any = [];
  columnsSchema: any = COLUMNS_SCHEMA;


  amountActive: boolean = false;
  subtotal: number = 0;
  descuento: number = 0;
  total: number = 0;
  ammount: any = 1;
  update: boolean = false;
  editAmmount: any = 0;
  id: number = 0;
  paymentMethod: string = 'Cash';
  barcode: string = '';

  shoppingcartForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private productsService: ProductosService) {
    this.shoppingcartForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required, Validators.min(0)],
      description: ['', Validators.required],
    });
  }

  onEnterKeyPressed(event: any) {
    this.productsService.addProductToCart(parseInt(this.barcode),1).subscribe((data: any) => {
      this.ngOnInit();
    });
    this.barcode = ''
  }

  ngOnInit(): void {
    this.productsService.getCart().subscribe((data: any) => {
      this.dataSource = data;
      this.efectivo();
    });
  }

  tarjeta(){
    this.subtotal = this.dataSource.reduce((acc: any, item: any) => acc + item.price * item.ammount, 0);
    this.descuento = 0;
    this.total = this.subtotal - this.descuento;
    this.paymentMethod = 'Card';
  }

  efectivo(){
    this.subtotal = this.dataSource.reduce((acc: any, item: any) => acc + item.price * item.ammount, 0);
    this.descuento = this.subtotal * 0.04;
    this.total = this.subtotal - this.descuento;
    this.paymentMethod = 'Cash';
  }

  edit(id: any, ammount: any){
    if (this.id == id){
      this.id = -1;
      this.productsService.addProductToCart(id, ammount).subscribe((data: any) => {
        this.ngOnInit();
      });
      this.ammount = 1;
    }else{
      this.id = id;
    }
  }

  delete(id: number){
    this.dataSource = this.dataSource.filter((item: any) => item.id !== id);
    this.productsService.deleteProductFromCart(id).subscribe((data: any) => {
    });
  }

  cancelar(){
    this.productsService.deleteCart().subscribe((data: any) => {});
    this.router.navigate(['/home']);
  }

  pagar(){
    // Agregar a la base de datos
    this.productsService.sendSaleFromCart(this.total, this.paymentMethod, (this.descuento != 0)?(this.descuento*100)/this.total:0).subscribe((data: any) => {});
    this.router.navigate(['/home']);
  }
}
