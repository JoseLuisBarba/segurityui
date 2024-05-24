import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions({
      skipInitialTransition: true,
      //onViewTransitionCreated(transitionInfo){
        //console.log(transitionInfo);
      //},
    })),
    importProvidersFrom( [HttpClientModule, ToastrModule.forRoot(), BrowserAnimationsModule]),
  ]
};
