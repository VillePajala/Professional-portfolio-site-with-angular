import { GithubService } from './../github.service';
import { Component, OnInit } from '@angular/core';
import { Projects } from '../projects';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  codeExamples : Projects[];

  constructor(private gitHubProjects : GithubService) {
    this.codeExamples = this.gitHubProjects.repositories;
   }

  ngOnInit() {
  }

}
