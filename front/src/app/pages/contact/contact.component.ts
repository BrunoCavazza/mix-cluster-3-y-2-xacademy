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
      Name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      messageType: ['Consulta', Validators.required]
    });

    Form = new FormGroup({
      Name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      message: new FormControl("", Validators.required)
    })

  ngOnInit(): void {
  }

    
  onSubmit(data) {

    const contact = {
      Name: data.Name,
      email: data.email,
      message: data.message
    }
    const jsonForm = JSON.stringify(contact);
      
      this.contactService.enviarFormulario(jsonForm).subscribe({
        next: (jsonForm) => {
          console.log('Formulario enviado con éxito', jsonForm);
        },
       error: (error) => {
          console.error('Error al enviar el formulario', error);
        }
    });
    
  }
}
  


