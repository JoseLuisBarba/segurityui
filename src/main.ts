import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import Mapboxgl from 'mapbox-gl'; 
 
Mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZWx1aXNiYXJiYWZhcnJvIiwiYSI6ImNsczBrdGJsZDAxdjMyanBlODRwcG42MzQifQ.rusGx5-HjrKEt3z2srPZ4w';



if ( !navigator.geolocation) {
  alert('Navegador no soporta la Geolocalización');
  throw new Error('Navegador no soporta la Geolocalización');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


