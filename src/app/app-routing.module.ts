import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { HomeComponent } from './pages/home/home.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { BarcodeComponent } from './pages/home/barcode/barcode.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'carrito', component: CarritoComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'barcode', component: BarcodeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
