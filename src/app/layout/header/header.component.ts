import { Component, OnInit, EventEmitter, HostListener, Output} from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { GenerateComponent } from './generate/generate.component';


// interface SideNavToggle {
//   screenWidth: number;
//   collapsed: boolean;
// }

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms',
          style({ opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms',
          style({ opacity: 0 })
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'}),
          ])  
        )
      ]),
    ]),
  ]
})
export class HeaderComponent implements OnInit {

  @Output() onToggleSidenav: EventEmitter<any> = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  
  collapsed = false;
  screenWidth = 0;
  navData = [
    {
      routerLink: 'home',
      icon: 'fa fa-home',
      label: 'Inicio'
    },
    {
      routerLink: 'carrito',
      icon: 'fa fa-shopping-cart',
      label: 'Carrito'
    },
    {
      routerLink: 'ventas',
      icon: 'fa fa-tag',
      label: 'Ventas'
    },
    {
      routerLink: 'barcode',
      icon: 'fa fa-barcode',
      label: 'Códigos'
    }
];

  constructor(private dialog: MatDialog) { }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({collapsed : this.collapsed, screenWidth: this.screenWidth});
  }
  
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSidenav.emit({collapsed : this.collapsed, screenWidth: this.screenWidth});
  }
  
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSidenav.emit({collapsed : this.collapsed, screenWidth: this.screenWidth});
    }
  }
  
  openDialog(){  
      this.dialog.open(GenerateComponent, {
        width: '400px',
        // height: '500px',
      });
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }


}
