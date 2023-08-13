import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/shared/services/productos.service';
import ConectorPluginV3 from 'src/app/ConectorPluginV3';


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

  //Impresión de Tickets/Barcodes
  impresoraSeleccionada: any = 'Seafon';
  impresoras: any = [];
  mensaje: any = '';

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
    // this.barcode = this.barcode.slice(0, -1);
    this.barcode = this.barcode;
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

    // Esto es parte de la impresión de Tickets/Barcodes
    // this.productsService.getPrinters().subscribe((data: any) => {
    //   this.impresoras = data;
    // });
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

  edit(id: any, ammount: any, oldAmmount: any){
    if (this.id == id){
      this.id = -1;
      if (ammount != oldAmmount && ammount > 0){  
        this.productsService.editProductFromCart(id, ammount).subscribe((data: any) => {
          this.ngOnInit();
        });
      }
      this.ammount = 1;
    }else{
      this.id = id;
      for (let i = 0; i < this.dataSource.length; i++) {
        if (this.dataSource[i].id == id){
          this.ammount = this.dataSource[i].ammount;
          break;
        }
      }
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
    this.productsService.sendSaleFromCart(this.paymentMethod).subscribe((data: any) => {});
    this.router.navigate(['/home']);
  }

  async ticket(){
    // if (!this.mensaje) {
    //   return alert('No hay nada que imprimir');
    // }
    const impresora = new ConectorPluginV3();
    impresora.Iniciar()
    .EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
    // .EscribirTexto('Hola Mundo')
    // .Feed(1)
    .CargarImagenLocalEImprimir('C:/Users/crist/OneDrive/Desktop/ITESO/8 Semestre/Diseño de Software/Proyecto_Final_Back/DharmaVet_Back/Back/barcode.png', 0, 440)
    // .ImprimirCodigoDeBarrasEan("1234567890123", 48, 96, 0)

    const response = await impresora.imprimirEn('Seafon');
    console.log(this.impresoras);
    
    if (response == true) {
      alert('Impresión exitosa');
    } else {
      alert('Error al imprimir: ' + response);
    }
  }

  // async ticket(){
  //   var arr = [];
  //   var dat = {
  //     type:"text",
  //     data:"Hola mundo" +"\n"
  //   };
  //   arr.push(dat);
  //   console.log(JSON.stringify(arr));
  //   this.productsService.printTicket().subscribe((data: any) => {
      
  //   });
  // }
}
