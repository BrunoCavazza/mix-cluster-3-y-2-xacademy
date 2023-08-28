import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/interfaces/survey';
import { getService } from 'src/app/services/survey.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {NgFor, NgIf} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  imports: [MatTableModule, MatButtonModule, NgFor, NgIf,MatIconModule]
})
export class DashboardComponent implements OnInit {
  surveys: Survey[] = []
  dataSource = this.surveys;
  columnsToDisplay = ['id', 'procedencia', 'createdAt'];
  columnsToDisplayWithExpand = [...this.surveys, 'expand'];
  expandedElement: Survey | null;
  

  constructor(private getService: getService) { }

  ngOnInit(): void {
    this.get();
  }
  get() {
    this.getService.get().subscribe(token => {
      this.surveys = token;
    })
  }

}
