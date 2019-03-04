import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  category : string = "";

  constructor() { }

  showPanel = (id) : void => {

    if (this.category == id) {
      this.category = "";
    } else {
      this.category = id;
    }
    
  }

  ngOnInit() {
  }

}
