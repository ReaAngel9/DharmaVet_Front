import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  imagenUrl: string = '';
  barcode: string = '';

  constructor(private productsService: ProductosService) { }

  ngOnInit(): void {
    this.productsService.getBarcode(0).subscribe((data: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        this.imagenUrl = reader.result as string;
      };
    });
  }

  onEnterKeyPressed(event: any) {
    this.barcode = this.barcode.slice(0, -1);
    this.productsService.addProductToCart(parseInt(this.barcode),1).subscribe((data: any) => {
      this.ngOnInit();
    });
    this.barcode = ''
  }

}
