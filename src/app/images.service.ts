import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  information : object = [];

  constructor(private http : HttpClient, private api : ApiService) { }

  /* apiKey : string = this.api.apiKey;

  private apiUrl : string = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}&user_id=munduswilmondo&format=json&nojsoncallback=1`;

  getImages = (callback) : any => {
    
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    this.http.get(this.apiUrl).subscribe((data : any) => {
      this.information = data.photos.photo;
      
      callback();
    },
    (err : any) => {
      console.log(err);
    });

  } */



}
