import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, AfterViewInit, ViewChild, ElementRef, OnInit} from '@angular/core';
import { MapService } from '@services/map.service';
import { PlacesService } from '@services/places.service';
import {Map, Popup, Marker} from 'mapbox-gl'


@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './mapView.component.html',
  styleUrl: './mapView.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MapViewComponent implements AfterViewInit, OnInit {

  @ViewChild('mapDiv') mapDivElement?: ElementRef;


  constructor( 
    private placesService: PlacesService,
    private mapService: MapService
    
  ) {

    this.placesService.getUserLocation();

  }

  ngOnInit(): void {
      this.placesService.getUserLocation();
  }
  
  ngAfterViewInit(): void {
    
    if (!!!this.placesService.userLocation()) throw Error('No hay user Location');
    if (!this.placesService.isLoadingPlaces()) throw Error('No hay PlacesService.userLocation');
    

 

    const map = new Map({
      container: this.mapDivElement?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation(), // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span> Estoy en este lugar del mundo</span>
      `);

    
    new Marker({color: 'red'})
      .setLngLat(this.placesService.userLocation())
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);


    /**
     * 
     * 
     * 
    if (!this.placesService.userLocation) throw Error('No hay PlacesService.userLocation');

    const map = new Map({
      container: this.mapDivElement?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span> Estoy en este lugar del mundo</span>
      `);

    
    new Marker({color: 'red'})
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);

    */

  }
}
