import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ArtComponent } from './art/art.component';
import { AboutComponent } from './about/about.component';
import { MusicComponent } from './music/music.component';
import { DesignComponent } from './design/design.component';
import { GamesComponent } from './games/games.component';

const routes : Routes = [
                      {
                        path : "art",
                        component : ArtComponent
                      },
                      {
                        path : "",
                        component : AboutComponent
                      },                      
                      {
                        path : "music",
                        component : MusicComponent
                      },
                      {
                        path : "games",
                        component : GamesComponent
                      },                         

]

@NgModule({
  declarations: [
    AppComponent,
    ArtComponent,
    AboutComponent,
    MusicComponent,
    DesignComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
