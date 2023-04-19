import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { CartComponent } from './cart/cart.component';

export interface SalesData {
  fecha: string;
  id: number;
  descuento: number;
  subtotal: number;
  pago: string;
  total: number;
}

const ELEMENT_DATA: SalesData[] = [
  {id: 1, fecha: 'Hydrogen', descuento: 1.0079, subtotal: 123, pago: "1", total: 123},
  {id: 2, fecha: 'Halo', descuento: 2.0079, subtotal: 123, pago: "1", total: 123},
  {id: 3, fecha: 'Zelda', descuento: 3.0079, subtotal: 123, pago: "1", total: 123},
  {id: 4, fecha: 'Hydrogen', descuento: 4.0079, subtotal: 123, pago: "1", total: 123},
  {id: 5, fecha: 'Hydrogen', descuento: 5.0079, subtotal: 123, pago: "1", total: 123},
  {id: 6, fecha: 'Hydrogen', descuento: 6.0079, subtotal: 123, pago: "1", total: 123},
];


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fecha', 'descuento', 'subtotal', 'pago', 'total'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  selectedRowIndex: number = 0;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  Select(id : number) {
    console.log(id);
    this.selectedRowIndex = id;
    this.dialog.open(CartComponent, {
      width: '400px',
      // height: '500px',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
