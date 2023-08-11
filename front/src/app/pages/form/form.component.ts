import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

/** @title Checkboxes with reactive forms */
@Component({
  selector: 'form-app',
  templateUrl: './form.component.html',
  styleUrls: ['form.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe],
})
export class FormComponent {
  difusion = this._formBuilder.group({
    television: false,
    pagina: false,
    radio: false,
    graficos: false,
    facebook: false,
    recomendacion: false,
    otros: String
  });

  constructor(private _formBuilder: FormBuilder) {}
}