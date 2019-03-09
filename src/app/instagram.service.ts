import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  apiKey : string;

  constructor(private http : HttpClient, private token : ApiService) {
    
   }

  information : object = [];  
  private apiUrl : string = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${process.env.INSTAGRAM_APIKEY}`;

  getFeed = () : any => {

    this.http.get(this.apiUrl).subscribe((data : any) => {
      this.information = data.data;

    },
    (err : any) => {
      console.log(err);
    });
  }
  
}
