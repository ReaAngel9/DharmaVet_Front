import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  generateForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<GenerateComponent>) { 
    this.generateForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required, Validators.min(0)],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  generateProduct() {
    this.dialogRef.close(this.generateForm.value);
  }

  cancel() {
    this.generateForm.reset();
  }

}
