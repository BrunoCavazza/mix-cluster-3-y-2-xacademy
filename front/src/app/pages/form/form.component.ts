import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe, NgFor} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';


/** @title Checkboxes with reactive forms */
@Component({
  selector: 'form-app',
  templateUrl: './form.component.html',
  styleUrls: ['form.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe,
    MatCardModule, MatButtonModule, MatInputModule,
    MatFormFieldModule, MatStepperModule, MatRadioModule, NgFor],
})
export class FormComponent {
  StepControl1 = this._formBuilder.group({
    Ctrl1: ['', Validators.required],
  });
  sexos: string[] = ['Masculino', 'Femenino'];
  sexoElegido: string; // VERIFICAR COMO ESCRIBIR ESTO. LISTO!

  turista = this._formBuilder.group({
    edad: "",
    sexo: "",
    procedencia: "",
    acompaniantes: "",    
  });

  difusion = this._formBuilder.group({
    television: false,
    pagina: false,
    radio: false,
    graficos: false,
    facebook: false,
    recomendacion: false,
    otros: "",
  });

  motivo = this._formBuilder.group({
    conocia: false,
    recomendacion: false,
    promocion: false,
    tranquilidad: false,
    paisajes: false,
    eventos: false,
    amabilidad: false,
    otros: "",
  });

  reserva = this._formBuilder.group({
    reserva: "",
    medioReserva: "",
  });

  tipoHospedaje = this._formBuilder.group({
    tipoHospedaje: "",
    // otrosHospedajes: ""
  });

  servicio = this._formBuilder.group({
    servicio: "",
  })

  materialInformativo = this._formBuilder.group({
    recibio: "",
    materialRecibido: ""
  })
  FormGroup2 = this._formBuilder.group({
    Ctrl2: ['', Validators.required],
  });
  FormGroup3 = this._formBuilder.group({
    Ctrl3: ['', Validators.required],
  });
  FormGroup4 = this._formBuilder.group({
    Ctrl4: ['', Validators.required],
  });
  FormGroup5 = this._formBuilder.group({
    Ctrl5: ['', Validators.required],
  });
  FormGroup6 = this._formBuilder.group({
    Ctrl6: ['', Validators.required],
  });
  FormGroup7 = this._formBuilder.group({
    Ctrl7: ['', Validators.required],
  });
  FormGroup8 = this._formBuilder.group({
    Ctrl8: ['', Validators.required],
  });
  FormGroup9 = this._formBuilder.group({
    Ctrl9: ['', Validators.required],
  });
  FormGroup10 = this._formBuilder.group({
    Ctrl10: ['', Validators.required],
  });
  FormGroup11 = this._formBuilder.group({
    Ctrl11: ['', Validators.required],
  });
  FormGroup12 = this._formBuilder.group({
    Ctrl12: ['', Validators.required],
  });
  FormGroup13 = this._formBuilder.group({
    Ctrl13: ['', Validators.required],
  });
  FormGroup14 = this._formBuilder.group({
    Ctrl14: ['', Validators.required],
  });
  FormGroup15 = this._formBuilder.group({
    Ctrl15: ['', Validators.required],
  });
  FormGroup16 = this._formBuilder.group({
    Ctrl16: ['', Validators.required],
  });
  FormGroup17 = this._formBuilder.group({
    Ctrl17: ['', Validators.required],
  });
  FormGroup18 = this._formBuilder.group({
    Ctrl18: ['', Validators.required],
  });
  constructor(private _formBuilder: FormBuilder) {
    this.sexoElegido = "";
  }
}

