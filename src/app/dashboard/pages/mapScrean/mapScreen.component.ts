import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlacesService } from '@services/places.service';
import LoadingComponent from '../loading/loading.component';
import MapViewComponent from '../mapView/mapView.component';
import LogoComponent from '../logo/logo.component';
import MyLocationComponent from '../myLocation/myLocation.component';
import SearchBarComponent from '../searchBar/searchBar.component';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-map-screen',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    MapViewComponent,
    LogoComponent,
    MyLocationComponent,
    SearchBarComponent
  ],
  templateUrl: './mapScreen.component.html',
  styleUrl: './mapScreen.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MapScreenComponent implements OnInit { 

  

  constructor( private placesService: PlacesService)  {


  }

  ngOnInit(): void {
      const observables = forkJoin([
        this.placesService.getUserLocation()
        
      ]);
      observables.subscribe(
        () => {
          this.placesService.userLocation
        }
      );
  }



  get isUserLocationReady() {

    
    return this.placesService.userLocation();

  }


  
}
