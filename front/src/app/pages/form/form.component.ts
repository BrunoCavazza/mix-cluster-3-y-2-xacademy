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
import { Router } from '@angular/router';


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
  turista = this._formBuilder.group({
    edad: ['', Validators.required],
    sexo: ['', Validators.required],
    procedencia: ['', Validators.required],
    acompaniantes: ['', Validators.required],
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
    reserva: ['', Validators.required],
    medioReserva: "",
  });

  tipo_hospedaje = this._formBuilder.group({
    tipo_hospedaje: ['', Validators.required],
    // otrosHospedajes: ""
  });

  calificacion_hospedaje = this._formBuilder.group({
    calificacion_hospedaje: ['', Validators.required],
  });

  material_informativo = this._formBuilder.group({
    recibioMaterial: ['', Validators.required],
  });

  // uso_oficina = this._formBuilder.group({
  //  uso_oficina: ['', Validators.required]
  // })

  oficina = this._formBuilder.group({
    oficina: ['', Validators.required]
  });

  tipo_informacion = this._formBuilder.group({
    hospedaje: false,
    paseos: false,
    eventos: false,
    gastronomia: false,
    turismo_aventura: false,
    servicios: false,
    rutas: false,
    otros: "",
  });

  medio_informacion = this._formBuilder.group({
    personalmente: false,
    email: false,
    facebook: false,
    telefonica: false,
    otros: "",
  });

   tipo_material = this._formBuilder.group({
     folletos: false,
     revistas: false,
     planos: false,
     calcomanias: false,
    guias: false
   });

   calificacion_informacion = this._formBuilder.group({
    calificacion_informacion: ['', Validators.required]
  });

   otra_informacion = this._formBuilder.group({
    otra_informacion: ['', Validators.required],
    cuales:""
   });

   que_informacion = this._formBuilder.group({
     espectaculos_MC: false,
     espectaculos_cercanos: false,
     recreacion: false,
     deportivas: false,
     aventuras: false,
     paseos: false,
     otros: "",
  });

   calificacion_MC = this._formBuilder.group({
    calificacion_MC: ['', Validators.required],
    porque: ""
   });

   recomendaria = this._formBuilder.group({
    recomendaria: ['', Validators.required],
    porque: ""
  });

  /* StepControl1 = this._formBuilder.group({
    Ctrl1: ['', Validators.required],
  });
  sexos: string[] = ['Masculino', 'Femenino'];
  sexoElegido: string; // VERIFICAR COMO ESCRIBIR ESTO. LISTO! */

  constructor(private _formBuilder: FormBuilder, private route: Router) {
    // this.sexoElegido = "";
  }

  submitForm(){
    // this.route.navigate(['/thankyou']);
    console.log(this.turista.value, this.difusion.value)
  }
}
