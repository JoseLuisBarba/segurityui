import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, computed } from '@angular/core';
import { Feature } from '@interfaces/places';
import { PlacesService } from '@services/places.service';
import { signal } from '@angular/core';
import { MapService } from '@services/map.service';

interface State {
  places: Feature[] 
  loading: boolean
}


@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './searchResults.component.html',
  styleUrl: './searchResults.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export default class SearchResultsComponent {


  public selectedId: string = '';





  constructor(
    private placesService: PlacesService,
    private mapService: MapService

  ) { }

  get isLoadingPlaces(): boolean {
    console.log('esta cargando los lugares?' , this.placesService.isLoadingPlaces());
    return this.placesService.isLoadingPlaces();
  }

  get places(): Feature[] {
    return this.placesService.places();
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {

    if (! this.placesService.userLocation()) 
      throw Error('No hay userLocation ');

    this.placesService.deletePlaces(); // elimina los otros lugares

    const start = this.placesService.userLocation();
    const end = place.center as [number, number];

    this.mapService.getRouteBetweenPoints(start, end);
  }

  /**
   * 


  
  get isLoadingPlaces(): boolean {
    console.log('esta cargando los lugares?' , this.placesService.isLoadingPlaces);
    return this.placesService.isLoadingPlaces;
  }


  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

     */

}
