import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  name   : string;
  street : string;
  postal : string;
  email  : string;
  phone  : string;

  school : string;
  degree : string;
  completed : string;
  
  constructor() { }

  personalInformattion = () : void => {

    this.name = "Ville Pajala"
    this.street = "Omenarinne 7"
    this.postal = "01390 Vantaa"
    this.email = "valoraami@gmail.com"
    this.phone = "+358 40 775 6545" 

  }


  defineEducation = () : void => {
    this.school = "South-Eastern Finland University of Applied Science";
    this.degree = "Computer Science BBA";
    this.completed = "2017 - 2021"
  }


  ngOnInit() {
  }

}
