import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

  scale : string = "scale(0.5)";

  constructor() { }

  zoom = () => {

    if (this.scale == "scale(1.0)") {
      this.scale = "scale(1.5)";
    } else {
      this.scale = "scale(1.0)";
    }

  }

  ngOnInit() {
  }

}
