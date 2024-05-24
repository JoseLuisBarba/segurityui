import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { TagItem, TagsResponse } from '@interfaces/tag';
import type { ProductItem, ProductsResponse } from '@interfaces/product';
import { delay, map } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface State {
  tags: Array<TagItem>,
  loading: boolean
}


@Injectable({
  providedIn: 'root'
})

export class TagService {

  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    tags: [],
  });



  public tags = computed( () => this.#state().tags );
  public loading = computed( () => this.#state().loading );

  constructor() { 
    this.http.get<ProductsResponse>('assets/data/tags.json')
      .pipe(delay(1500))
      .subscribe( res => {
        this.#state.set({
          loading: false,
          tags: res.data
        });
      });
  }




  addTag(newTag: TagItem) {

  }



}