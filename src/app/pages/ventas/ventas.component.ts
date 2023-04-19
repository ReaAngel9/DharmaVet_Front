import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { CartComponent } from './cart/cart.component';

export interface SalesData {
  fecha: Date;
  id: number;
  descuento: number;
  subtotal: number;
  pago: string;
  total: number;
}

// const ELEMENT_DATA: SalesData[] = [
//   {id: 1, fecha: 'Hydrogen', descuento: 1.0079, subtotal: 123, pago: "1", total: 123},
//   {id: 2, fecha: 'Halo', descuento: 2.0079, subtotal: 123, pago: "1", total: 123},
//   {id: 3, fecha: 'Zelda', descuento: 3.0079, subtotal: 123, pago: "1", total: 123},
//   {id: 4, fecha: 'Hydrogen', descuento: 4.0079, subtotal: 123, pago: "1", total: 123},
//   {id: 5, fecha: 'Hydrogen', descuento: 5.0079, subtotal: 123, pago: "1", total: 123},
//   {id: 6, fecha: 'Hydrogen', descuento: 6.0079, subtotal: 123, pago: "1", total: 123},
// ];


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fecha', 'descuento', 'subtotal', 'pago', 'total'];
  dataSource: any = [];

  selectedRowIndex: number = 0;
  filter: any;
  noData: boolean = false;

  constructor(private dialog: MatDialog, private productsService: ProductosService) { }

  ngOnInit(): void {
    this.productsService.getSales().subscribe((data: any) => {
      this.filter = data.sales;
      this.dataSource = data.sales
    });
  }

  Select(id : number) {
    this.selectedRowIndex = id;
    for (const i in this.dataSource) {
      if (this.dataSource[i].id == id) {
        this.dialog.open(CartComponent, {
          data: {i},
          width: '70%',
          // height: '500px',
        });

      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsService.getSales().subscribe((data: any) => {
      console.log(data.sales);

      this.filter = data.sales.filter((sale: any) => {
        console.log(sale['id'].toString().toLowerCase().includes(filterValue.trim().toLowerCase()));

        return
        sale['id'].toString().toLowerCase().includes(filterValue.trim().toLowerCase());
        // (sale.date.toLowerCase().includes(filterValue.trim().toLowerCase())) ||
        // (sale.percentage_discount.toString().toLowerCase().includes(filterValue.trim().toLowerCase())) ||
        // (sale.subtotal.toString().toLowerCase().includes(filterValue.trim().toLowerCase())) ||
        // (sale.payment_method.toLowerCase().includes(filterValue.trim().toLowerCase())) ||
        // (sale.total.toString().toLowerCase().includes(filterValue.trim().toLowerCase()));
      });
      this.dataSource = this.filter;
      if(this.filter.length == 0){
        this.noData = true;
      }else{
        this.noData = false;
      }
    });
    if (filterValue.length == 0) {
      this.productsService.getSales().subscribe((data: any) => {
        this.dataSource = data.sales;
      });
    }
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
