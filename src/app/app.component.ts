import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DharmaVet';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSidenav(data: SideNavToggle): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth; 
  }
}
