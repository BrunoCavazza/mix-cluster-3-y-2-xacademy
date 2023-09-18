import { Component, OnInit, ViewChild } from '@angular/core';
import { Survey } from 'src/app/interfaces/survey';
import { getService } from 'src/app/services/survey.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { ChartComponent } from '../chart/chart.component';
import {MatInputModule} from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/interfaces/contact';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatButtonModule, NgFor, NgIf,MatIconModule, MatDividerModule, MatTabsModule, MatCardModule, ChartComponent, MatInputModule,MatPaginatorModule]
})

export class DashboardComponent implements OnInit {
  surveys: Survey[] = []
  contact: Contact[] = []
  dataSource = new MatTableDataSource(this.surveys);
  contactSource = new MatTableDataSource(this.contact);
  columnsToDisplay = ['id', 'procedencia', 'Fecha'];
  contactsToDisplay = ['id', 'Nombre', 'Fecha'];
  columnsToDisplayWithExpand = [...this.surveys, 'expand'];
  contactsToDisplayWithExpand = [...this.contact, 'expand']
  expandedElement: Survey | null;
  expandedContact: Contact | null;
  filterPost = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private getService: getService, private _getContacts: ContactService) { }


  applyFilter() {
    const filterValue = this.filterPost.trim().toLowerCase();

    if (!isNaN(Number(filterValue))) {
      this.dataSource.filterPredicate = (data: Survey, filter: string) => {

        return data.id.toString().toLowerCase().includes(filter);
      };
    } else {

      this.dataSource.filterPredicate = (data: Survey, filter: string) => {
        return data.Turista.procedencia.toLowerCase().includes(filter);
      };
    }
    this.dataSource.filter = filterValue;
  }

  customFilter(data: Survey, filter: string): boolean {
    return data.Turista.procedencia.toLowerCase().includes(filter);
  }
  ngOnInit(): void {
    this.get();
    this.getContacts();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  get() {
    this.getService.get().subscribe(token => {
      this.dataSource.data = token;
    })
  }
  getContacts(){
    this._getContacts.get().subscribe(token =>{
      this.contactSource.data = token
    })
  }

  export(){
    this.getService.export().subscribe((buffer:any) => {
      const data: Blob = new Blob([buffer], {
        type: "json/csv;charset=utf-8"
      });
      saveAs(data, "Hoja_de_datos_Mina_Clavero.csv");
    })
  }


}
