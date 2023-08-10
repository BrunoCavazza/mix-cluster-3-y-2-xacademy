import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  step: any = 1;
  submitted: any = false;
  multistep = new FormGroup({
       userDetails: new FormGroup({
           edad: new FormControl('',Validators.required),
           genero: new FormControl(''),
           procedencia: new FormControl(''),
           acomp: new FormControl('')
       }),
       encuesta: new FormGroup({
        difusion: new FormControl('', Validators.required),
        motivo: new FormControl(''),
        reserva: new FormControl(''),
        tipo_hospedaje: new FormControl(''),
        calificacion_hospedaje: new FormControl(''),
        material_informativo: new FormControl(''),
        uso_oficina: new FormControl(''),
        oficina: new FormControl(''),
        tipo_informacion: new FormControl(''),
        medio_informacion: new FormControl(''),
        tipo_material: new FormControl(''),
        calificacion_informacion: new FormControl(''),
        otra_informacion: new FormControl(''),
        que_informacion: new FormControl(''),
        calificacion_MC: new FormControl(''),
        recomendaria: new FormControl('')
    })
  })
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  get userDetails() {
        return this.multistep.controls['userDetails']['controls'];
  }

  get encuesta() {
    return this.multistep.controls['encuesta']['controls'];
}

  submit() {  
      this.submitted = true;
      if(this.multistep.controls.userDetails.invalid && this.step == 1) {
        return;
      }
      if(this.multistep.controls.encuesta.invalid && this.step == 2) {
        return;
      }
      if(this.multistep.controls.encuesta.invalid && this.step == 3) {
        return;
      }
      this.step = this.step + 1;
      if(this.step == 18) {
          this.route.navigate(['/thankyou'])
      }
  }

  previous() {
    this.step = this.step - 1;
  }



}
