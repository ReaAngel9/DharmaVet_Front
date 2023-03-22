import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface SalesData {
  name: string;
  id: number;
  price: number;
  description: string;
  ammount: number;
}

const ELEMENT_DATA: SalesData[] = [
  {id: 1, name: 'Hydrogen', price: 1.0079, description: 'H', ammount: 1},
  {id: 2, name: 'Halo', price: 2.0079, description: 'H', ammount: 1},
  {id: 3, name: 'Zelda', price: 3.0079, description: 'H', ammount: 1},
  {id: 4, name: 'Hydrogen', price: 4.0079, description: 'H', ammount: 1},
  {id: 5, name: 'Hydrogen', price: 5.0079, description: 'H', ammount: 1},
  {id: 6, name: 'Hydrogen', price: 6.0079, description: 'H', ammount: 1},
];


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'ammount'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {    
    const filterValue = (event.target as HTMLInputElement).value;    
    this.dataSource.filter = filterValue.trim().toLowerCase();    
  }


}
