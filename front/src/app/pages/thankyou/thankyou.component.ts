import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css'],
  standalone: true,
  imports: [MatButtonModule],
  // animations:[
  //   trigger('enterState', [
  //     state('void', style({
  //       transform: 'translateY(100%)',
  //       opacity:0
  //     })),
  //     transition(':enter', [
  //       animate(500, style({
  //         transform: 'translateY(0)',
  //         opacity:1
  //       }))
  //     ])
  //   ])
  // ]
})
export class ThankyouComponent implements OnInit {


  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  button(){
    this.route.navigate(['/home'])
  }
}


