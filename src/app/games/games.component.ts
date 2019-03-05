import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  togglePanel1 : boolean = false;
  togglePanel2 : boolean = false;
  togglePanel3 : boolean = false;
  togglePanel4 : boolean = false;

  

  constructor() { }

 

  showGame1 = () : void => {
    this.togglePanel1 = !this.togglePanel1;
  }

  showGame2 = () : void => {
    this.togglePanel2 = !this.togglePanel2;
  }

  showGame3 = () : void => {
    this.togglePanel3 = !this.togglePanel3;
  }

  showGame4 = () : void => {
    this.togglePanel4 = !this.togglePanel4;
  }


  ngOnInit() {
  }

}
