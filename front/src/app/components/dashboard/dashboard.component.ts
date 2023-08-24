import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { getService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listUser: User[] = []

  constructor(private getService: getService) { }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.getService.get().subscribe(token => {
      this.listUser = token;
    })
  }

}
