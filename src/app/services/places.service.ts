import { Injectable, AfterViewInit, computed, inject, Signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Feature, PlacesResponse } from "@interfaces/places";
import { PlacesApiClient } from "../api/placesApiClient";
import { signal } from "@angular/core";
import { forkJoin } from "rxjs";
import { OnInit } from "@angular/core";
import { MapService } from "./map.service";

interface StatePlaces {
    places: Feature[],
    loading: boolean
}

interface StateUserLocation {
    userLocation: number[], // [number, number]
    loading: boolean
}


@Injectable({
    providedIn: 'root'
})

export class PlacesService  implements OnInit{


    private placesApi = inject(PlacesApiClient);
    private mapService = inject(MapService);

    private http = inject(HttpClient);


    #statePlaces = signal<StatePlaces> ({
        places: [],
        loading: true
    });

    #stateUserLocation = signal<StateUserLocation> ({
        userLocation: [],
        loading: true
    });


    public userLocation: Signal<[number, number]> = computed( () => [   
        this.#stateUserLocation().userLocation[0], 
        this.#stateUserLocation().userLocation[1]
    ]);

    public places: Signal<Feature[]> = computed( () => this.#statePlaces().places );

    public isLoadingPlaces: Signal<boolean> = computed( () => this.#statePlaces().loading);



    constructor(

    ) {

        this.getUserLocation().then(() => {

            console.log('User location fetched:', this.userLocation());

          }).catch((error) => {

            console.error('Error fetching user location:', error);

          });
    }

    ngOnInit(): void {
        this.getUserLocation().then(() => {
            console.log('User location fetched:', this.userLocation());
        }).catch((error) => {

            console.error('Error fetching user location:', error);

        });
    }

    get isUserLocationReady(): boolean {
        return this.userLocation().length > 0;
    }

    public async getUserLocation(): Promise<[number, number]> {
        return new Promise( (resolve, reject) => {

            navigator.geolocation.getCurrentPosition(

                ({coords}) => {
                
                    this.#stateUserLocation.update(value => ({
                        ...value,
                        userLocation: [coords.longitude, coords.latitude]
                    }));

                    resolve(this.userLocation());

                }, (err) => {
                    alert('No se pudo obtener la geolocalización');
                    console.log(err);
                    reject();
                }
            );
        });
    } 


    getPlacesByQuery(query: string= '') {

        if (query.length === 0) {

            this.#statePlaces.set({
                places: [],
                loading: false
            });


            return;
        }

        if (!this.userLocation) {
            throw Error('No hay User Location.')
        }


        this.#statePlaces.update( value => ({
            ...value,
            loading: true
        }));



        this.placesApi.get<PlacesResponse>(`/${query}.json`, { 
            params: {
                proximity: this.userLocation()?.join(',')
            }
        })
            .subscribe(resp => {
                this.#statePlaces.set({
                    places: resp.features,
                    loading: false
                });

                this.mapService.createMarkersFromPlaces(this.places(), this.userLocation());

                console.log(this.places);
            });
    }

    deletePlaces() {
        this.#statePlaces.update(value => ({
            ...value,
            places: []
        }));
    }

    /*
    userLocation!: [number, number];
    public isLoadingPlaces: boolean = false;
    public places: Feature[] = [];


    constructor(private placesApi: PlacesApiClient) {
        this.getUserLocation();
    }
    
    get isUserLocationReady(): boolean {
        return !!this.userLocation;
    }


    public async getUserLocation(): Promise<[number, number]> {
        return new Promise( (resolve, reject) => {

            navigator.geolocation.getCurrentPosition(
                ({coords}) => {
                    this.userLocation = [coords.longitude, coords.latitude];
                    resolve(this.userLocation);
                }, (err) => {
                    alert('No se pudo obtener la geolocalización');
                    console.log(err);
                    reject();
                }
            );
        });
    } 


    getPlacesByQuery(query: string= '') {

        if (query.length === 0) {
            this.isLoadingPlaces = false;
            this.places = [];
            return;
        }

        if (!this.userLocation) {
            throw Error('No hay User Location.')
        }

        this.isLoadingPlaces = true;
        this.placesApi.get<PlacesResponse>(`/${query}.json`, { 
            params: {
                proximity: this.userLocation?.join(',')
            }
        })
            .subscribe(resp => {
                this.isLoadingPlaces = false;
                this.places = resp.features;
                console.log(this.places);
            });
    }

    */
   
    
}