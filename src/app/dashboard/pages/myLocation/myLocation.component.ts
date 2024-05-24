import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapService } from '@services/map.service';
import { PlacesService } from '@services/places.service';

@Component({
  selector: 'app-my-location',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './myLocation.component.html',
  styleUrl: './myLocation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyLocationComponent { 


  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ) {}


  goToMyLocation() {

    if ( !this.placesService.isUserLocationReady) {
      throw Error('No hay ubicación de usuario.');
    }

    if (!this.mapService.isMapReady) {
      throw Error('No hay mapa disponible');
    }


    this.mapService.flyTo(this.placesService.userLocation());
  }

}
