import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import SearchResultsComponent from '../searchResults/searchResults.component';
import { PlacesService } from '@services/places.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    SearchResultsComponent
  ],
  templateUrl: './searchBar.component.html',
  styleUrl: './searchBar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchBarComponent {

  #debounceTimer?: NodeJS.Timeout;

  constructor(
    private placesServices: PlacesService
  ) {}

  onQueryChanged(query: string = '') {

    if(this.#debounceTimer)
      clearTimeout(this.#debounceTimer);

      this.#debounceTimer = setTimeout( () => {

        this.placesServices.getPlacesByQuery(query);

      }, 350);

  }

}
