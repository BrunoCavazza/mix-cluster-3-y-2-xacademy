import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [MatOptionModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule]

})
export class ContactComponent implements OnInit {
  
  
  constructor(private fb: FormBuilder, private contactService: ContactService) {
   }

      formulario = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      messageType: ['Consulta', Validators.required]
    });

  ngOnInit(): void {
  }

    
  onSubmit() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
  
      this.contactService.enviarFormulario(formData).subscribe(
        (response) => {
          console.log('Formulario enviado con éxito', response);
        },
        (error) => {
          console.error('Error al enviar el formulario', error);
        }
      );
    }
  }
}
  


