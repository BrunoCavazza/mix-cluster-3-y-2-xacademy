import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css'],
  standalone: true,
  imports: [MatButtonModule]
})
export class ThankyouComponent implements OnInit {


  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  button(){
    this.route.navigate(['/login'])
  }
}
