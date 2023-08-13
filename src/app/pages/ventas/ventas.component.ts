import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { CartComponent } from './cart/cart.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

export interface SalesData {
  fecha: Date;
  id: number;
  descuento: number;
  subtotal: number;
  pago: string;
  total: number;
}


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'], 
})
export class VentasComponent implements OnInit {

  //Table Variables
  displayedColumns: string[] = ['id', 'fecha', 'descuento', 'subtotal', 'pago', 'total'];
  dataSource: any = [];
  selectedRowIndex: number = 0;

  //Normal Filter Variables
  filter: any;
  noData: boolean = false;

  //Date Filter Variables
  dateFilterData: any;
  startDate = new Date(2023, 0, 1);
  endDate = new Date();

  //Summary Variables
  rangeDate: string = '';
  discountSum: number = 0;
  subtotalSum: number = 0;
  totalSum: number = 0;

  constructor(private dialog: MatDialog, private productsService: ProductosService) { }

  ngOnInit(): void {
    this.getSales();
    this.startDate = new Date(2023, 0, 1);
    this.endDate = new Date();
    this.getRangeDate();
  }

  SaleSummary(id : number) {
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


  cleanDateFilter() {
    this.startDate = new Date(2023, 0, 1);
    this.endDate = new Date();
    this.getRangeDate();
    this.productsService.getSales().subscribe((data: any) => {
      this.dataSource = data.sales;
    });
  }


  dateFilter (event: any, fullDate: boolean) {
    const filterValue = event.target.value;
    console.log(fullDate, filterValue);
    
    if (fullDate) {// End date
      this.endDate = new Date(filterValue);
      this.getRangeDate();
    } else { //Start date
      this.startDate = new Date(filterValue);
    }
    
    if (fullDate) {
      this.productsService.getSales().subscribe((data: any) => {

        this.dateFilterData = data.sales.filter((sale: any) => {
          const saleDate = this.getDate(sale.date);
          return saleDate >= this.startDate && saleDate <= this.endDate;
        });

        this.dataSource = this.dateFilterData;
        this.noData = !(this.dateFilterData.length == 0);
        this.getDiscountSum();
        this.getSubtotalSum();
        this.getTotalSum();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsService.getSales().subscribe((data: any) => {

      this.filter = data.sales.filter((sale: any) => {


        return   sale['id'].toString().toLowerCase().includes(filterValue.trim().toLowerCase()) ||
        (sale.date.toLowerCase().includes(filterValue.trim().toLowerCase())) ||
        (sale.percentage_discount.toString().toLowerCase().includes(filterValue.trim().toLowerCase())) ||
        (sale.subtotal.toString().toLowerCase().includes(filterValue.trim().toLowerCase())) ||
        (sale.payment_method.toLowerCase().includes(filterValue.trim().toLowerCase())) ||
        (sale.total.toString().toLowerCase().includes(filterValue.trim().toLowerCase()));
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

  getSales () {
    this.productsService.getSales().subscribe((data: any) => {
      this.dataSource = data.sales
      this.getDiscountSum();
      this.getSubtotalSum();
      this.getTotalSum();
    });
  }

  getDate (date: string) : Date {
    const inDate = date.split(' ')[0];
    const day = Number(inDate.split('/')[0]);    
    const month = Number(inDate.split('/')[1]);
    const year = Number(inDate.split('/')[2]);


    return new Date (year, month-1, day);
  }

  getRangeDate () {
    this.rangeDate = this.startDate.toLocaleDateString() + ' - ' + this.endDate.toLocaleDateString();
  }

  getDiscountSum () {
    this.discountSum = 0;
    for (const i in this.dataSource) {
      this.discountSum += (this.dataSource[i].percentage_discount/100)*this.dataSource[i].subtotal;
    }
  }

  getSubtotalSum () {
    this.subtotalSum = 0;
    for (const i in this.dataSource) {
      this.subtotalSum += this.dataSource[i].subtotal;
    }
  }

  getTotalSum () {
    this.totalSum = 0;
    for (const i in this.dataSource) {    
      this.totalSum += this.dataSource[i].total;
    }
  }

}
