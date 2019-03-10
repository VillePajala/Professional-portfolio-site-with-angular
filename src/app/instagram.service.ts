/* import { ApiService } from './api.service'; */ // remove from deployment
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  apiKey : string;
  

  constructor(private http : HttpClient/* , private token : ApiService */) {    // Remove token from production
    this.getFeed();
   }

  /* herokuApiKey = process.env.INSTAGRAM_APIKEY;  */   // Release in production
  /* localApiKey: string = this.token.apiKey; */  // Remove from production

  information : object;  
  private apiUrl : string = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${}`;

  getFeed = () : any => {

    this.http.get(this.apiUrl).subscribe((data : any) => {
      this.information = data.data;
      console.log(this.apiUrl)
      console.log(this.herokuApiKey)
    },
    (err : any) => {
      console.log(err);
    });
  }
  
}
