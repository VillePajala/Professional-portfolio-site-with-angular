import { Projects } from './projects';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  repositories : Projects[];

  constructor() { }
}
