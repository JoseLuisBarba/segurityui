import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { ProductionItem, ProductionsResponse } from '@interfaces/production';
import { delay} from 'rxjs';


interface State {
  products: Array<ProductionItem>,
  loading: boolean
}


@Injectable({
  providedIn: 'root'
})
export class ProductionService {



  private http = inject(HttpClient);

  state = signal<State>({
    loading: true,
    products: [],
  });

  public products = computed( () => this.state().products );
  public loading = computed( () => this.state().loading );

  constructor() { 
    this.http.get<ProductionsResponse>('assets/data/productions.json')
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


  addProduct(newProduct: ProductionItem): void {
    this.products().push(newProduct);
    this.seeChanges(this.products());
  }

  seeChanges(products: ProductionItem[]): void {
    this.state.update(
      value => ({
        ...value,
        products: products
      })
    );
  }

  updateData(): Array<ProductionItem> {
    this.http.get<ProductionsResponse>('assets/data/productions.json')
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

  changePin(productItem: ProductionItem, index: Number): void {
    const integerIndex = parseInt(index.toString(), 10);
    this.products()[integerIndex] = productItem;
    this.seeChanges(this.products());
  }

  editProduct(productItem: ProductionItem, index: Number): void {
    const integerIndex = parseInt(index.toString(), 10);
    this.products()[integerIndex] = productItem;
    this.seeChanges(this.products());
  }

  delete(productItem?: ProductionItem): void {
    if (productItem) {
      const index = this.products().findIndex((p) => p.id === productItem.id);
      if (index !== -1) {
        this.products().splice(index, 1);
        this.seeChanges(this.products());
      }
    }
    
  }

}
