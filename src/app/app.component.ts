import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  navbarOpen : boolean = false;
  panelOpen : boolean = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  togglePanel() {
    this.panelOpen = !this.panelOpen;
  }

  data : object;


}
