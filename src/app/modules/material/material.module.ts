import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class MaterialModule { }
