import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { ArtComponent } from './art/art.component';
import { AboutComponent } from './about/about.component';
import { MusicComponent } from './music/music.component';
import { CvComponent } from './cv/cv.component';


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
                        path : "cv",
                        component : CvComponent
                      },
                      {
                        path : "**",
                        redirectTo : ""
                      }

]

@NgModule({ declarations: [
        AppComponent,
        ArtComponent,
        AboutComponent,
        MusicComponent,
        CvComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(routes, {
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
            scrollOffset: [0, 80]
        })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
