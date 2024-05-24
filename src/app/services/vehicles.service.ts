import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Vehicle, VehicleResponse, VehiclesResponse } from '@interfaces/vehicle-interfaces';
import { delay, map } from 'rxjs';


interface State {
    vehicles: Vehicle[],
    loading: boolean
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private http = inject(HttpClient);
  
    #state = signal<State>({
      loading: true,
      vehicles: [],
    });
  
    public vehicles = computed( () => this.#state().vehicles );

    
    public loading = computed( () => this.#state().loading );
  
    constructor() { 
      this.http.get<VehiclesResponse>('https://reqres.in/api/users')
        .pipe(delay(1500))
        .subscribe( res => {
          this.#state.set({
            loading: false,
            vehicles: res.data
          });
        });
    }
  
  
  }
  