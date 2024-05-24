import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { User, UsersResponse, UserResponse  } from '@interfaces/req-response';
import type { ProductItem, ProductsResponse } from '@interfaces/product';
import { delay, map } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface State {
  products: Array<ProductItem>,
  loading: boolean
}


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private http = inject(HttpClient);

  state = signal<State>({
    loading: true,
    products: [],
  });

  public products = computed( () => this.state().products );
  public loading = computed( () => this.state().loading );

  constructor() { 
    this.http.get<ProductsResponse>('assets/data/products.json')
      .pipe(delay(1500))
      .subscribe( res => {
        const data = res.data.filter(x => x.pin).slice().concat(res.data.filter(x => !x.pin).slice().sort( (a, b) => {return this.azComparation(a.name, b.name, true)}));
        this.state.set({
          loading: false,
          products: data
        });
      });
  }

  azComparation(a: string, b: string, isAscending: boolean= true): number {
    const valA = a?.toLocaleLowerCase() || '';
    const valB = b?.toLocaleLowerCase() || '';
    return valA.localeCompare(valB) * (isAscending ? 1 : -1);
  }


  addProduct(newProduct: ProductItem): void {
    this.products().push(newProduct);
    this.seeChanges(this.products());
  }

  seeChanges(products: ProductItem[]): void {
    this.state.update(
      value => ({
        ...value,
        products: products
      })
    );
  }

  updateData(): Array<ProductItem> {
    this.http.get<ProductsResponse>('assets/data/products.json')
      .pipe()
      .subscribe( res => {
        const data = res.data.filter(x => x.pin).slice().concat(res.data.filter(x => !x.pin).slice().sort( (a, b) => {return this.azComparation(a.name, b.name, true)}));
        console.log('1');
        this.state.set({
          loading: false,
          products: data
        });
    });

    return this.products();
  }




  changePin(productItem: ProductItem, index: Number): void {
    const integerIndex = parseInt(index.toString(), 10);
    this.products()[integerIndex] = productItem;
    this.seeChanges(this.products());
  }

  editProduct(productItem: ProductItem, index: Number): void {
    const integerIndex = parseInt(index.toString(), 10);
    this.products()[integerIndex] = productItem;
    this.seeChanges(this.products());
  }

  delete(productItem?: ProductItem): void {
    if (productItem) {
      const index = this.products().findIndex((p) => p.id === productItem.id);
      if (index !== -1) {
        this.products().splice(index, 1);
        this.seeChanges(this.products());
      }
    }
    
  }

}