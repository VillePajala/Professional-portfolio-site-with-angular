import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent implements OnInit {

  data : object;

  constructor(private images : ImagesService) { }

  setValues = () : void => {
    this.data = this.images.information;
  }


  getData = () : void => {

    this.images.getImages(this.setValues)

  }

  ngOnInit() {
  }

}
