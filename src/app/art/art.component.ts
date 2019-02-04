import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent implements OnInit {

  pictureData : object;

  constructor(private images : ImagesService) { }

  setValues = () : void => {
    this.pictureData = this.images.information;
    console.log(this.pictureData);
  }


  getData = () : void => {

    this.images.getImages(this.setValues)

  }

  ngOnInit() {
  }

}
