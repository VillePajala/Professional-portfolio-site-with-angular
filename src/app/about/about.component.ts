import { InstagramService } from './../instagram.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private instagram : InstagramService) { }

  ngOnInit() {
  }

}
