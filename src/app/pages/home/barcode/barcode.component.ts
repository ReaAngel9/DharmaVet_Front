import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  imagenUrl: string = '';
  barcode: string = '';
  products: any = [];

  routerBarcodeID: any = 0;

  constructor(
    private productsService: ProductosService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {      
      if (params.get('id') != null) {
        this.routerBarcodeID = params.get('id') as string;
      }
    });

    this.productsService.getBarcode(this.routerBarcodeID).subscribe((data: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        this.imagenUrl = reader.result as string;
      };
    });
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data.products;     
    });
  }

  onEnterKeyPressed(event: any) {
    this.barcode = this.barcode.slice(0, -1);
    this.productsService.addProductToCart(parseInt(this.barcode),1).subscribe((data: any) => {
      this.ngOnInit();
    });
    this.barcode = ''
  }

  loadBarcode(id: number) {
    this.productsService.getBarcode(id).subscribe((data: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        this.imagenUrl = reader.result as string;
      };
    });
  }
}
