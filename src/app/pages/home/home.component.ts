import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
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
    key: "active",
    type: "text",
    label: ""
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images =  [
    {
      imageSrc: 'https://doctoravanevet.com/wp-content/uploads/2020/04/Servicios-vectores-consulta-integral.png',
      imageAlt: 'Image 1'
    },
    {
      imageSrc: 'data:image/png;base64,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',
      imageAlt: 'Image 2'
    },
    {
      imageSrc: 'https://b2130394.smushcdn.com/2130394/wp-content/uploads/2020/01/cabecera-trabajar-de-veterinario-en-australia.png?lossy=1&strip=1&webp=1',
      imageAlt: 'Image 3'
    },
  ];


  selectedIndex: number = 0;
  columnsSchema: any = COLUMNS_SCHEMA;

  countCart: boolean = false;
  active: number = 0;
  ammount: number = 0;
  noData: boolean = false;
  filter: any;
  inputForm: FormGroup;
  productToEdit: boolean = false;

  nombre: string = '';
  precio: number = 0;
  descripcion: string = '';

  idToEdit: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productsService: ProductosService,
    private carousel: NgbCarouselModule,) {
    this.inputForm = this.fb.group({
      count: ['', Validators.required]
    });

   }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: any) => {
      this.filter = data.products;
    });

  }

  Activate(element: any){
    this.active = element;
    this.countCart = !this.countCart;
  }

  AddCart(element: any, ammount: any){
    this.Activate(element);
    this.productsService.addProductToCart(element,ammount).subscribe((response: any) => {
    });
    this.ammount = 0;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsService.getProducts().subscribe((data: any) => {
      this.filter = data.products.filter((item: any) => {
        return item.name.toLowerCase().includes(filterValue.toLowerCase())
      });
      if(this.filter.length == 0){
        this.noData = true;
      }else{
        this.noData = false;
      }
    });
  }

  deleteProduct(element: any, id: any){
    if(confirm("Estás seguro de querer eliminar el producto "+element)) {
      this.productsService.deleteProduct(id).subscribe((data: any) => {
        this.ngOnInit();
      });
    }
  }

  editProduct(id: any){
    if(this.idToEdit == id){
      const data: {name?: string, price?: number, description?: string} = {name: this.nombre, price: this.precio, description: this.descripcion};

      if (this.nombre == '')       delete data.name;
      if (this.precio == 0)        delete data.price;
      if (this.descripcion == '')  delete data.description;

      this.productsService.editProduct(id, data).subscribe((data: any) => {
          this.ngOnInit();
      });

      this.idToEdit = -1;
    }else{
      this.idToEdit = id;
    }
  }

  barcodeRedirect(id:any){
    this.productsService.getBarcode(id).subscribe((data: any) => {
      this.router.navigate(['/barcode', id]);
    });
  }
}
