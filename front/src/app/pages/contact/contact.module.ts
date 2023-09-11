import { NgModule } from '@angular/core';
import {  CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactRoutingModule, } from './contact-routing.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    MatSelectModule
  ],
})
export class ContactModule { }
