import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { ArtComponent } from './art/art.component';
import { AboutComponent } from './about/about.component';
import { MusicComponent } from './music/music.component';
import { DesignComponent } from './design/design.component';
import { GamesComponent } from './games/games.component';
import { DevComponent } from './dev/dev.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { ContactComponent } from './contact/contact.component';


const routes : Routes = [
                      {
                        path : "",
                        component : AboutComponent
                      },   
                      {
                        path : "art",
                        component : ArtComponent
                      },                     
                      {
                        path : "music",
                        component : MusicComponent
                      },
                      {
                        path : "design",
                        component : DesignComponent
                      },
                      {
                        path : "games",
                        component : GamesComponent
                      }, 
                      {
                        path : "dev",
                        component : DevComponent
                      },
                      {
                        path : "curriculum",
                        component : CurriculumComponent
                      },
                      {
                        path : "contact",
                        component : ContactComponent
                      }                                                

]

@NgModule({
  declarations: [
    AppComponent,
    ArtComponent,
    AboutComponent,
    MusicComponent,
    DesignComponent,
    GamesComponent,
    DevComponent,
    CurriculumComponent,
    ContactComponent,
    CvComponent,
    CodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
