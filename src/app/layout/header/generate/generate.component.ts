import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  generateForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<GenerateComponent>, private productsService: ProductosService, private router: Router) {
    this.generateForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required, Validators.min(0)],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  generateProduct() {
    this.productsService.generateProduct(this.generateForm.value.name, this.generateForm.value.price, this.generateForm.value.description).subscribe((data: any) => {
      if(window.location.href.includes('home')) {
        window.location.reload();
      }else{
        this.router.navigate(['/home']);
      }
    });
    this.dialogRef.close(this.generateForm.value);
  }

  cancel() {
    this.generateForm.reset();
  }

}
