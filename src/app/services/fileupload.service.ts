import { HttpClient, HttpRequest,  HttpEvent } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { User, UsersResponse, UserResponse  } from '@interfaces/req-response';
import type { ProductItem, ProductsResponse } from '@interfaces/product';
import { delay, map } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface State {
  products: Array<ProductItem>,
  loading: boolean
}


@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:4200';  

  #state = signal<State>({
    loading: true,
    products: [],
  });

  public products = computed( () => this.#state().products );
  public loading = computed( () => this.#state().loading );

  constructor() { 
    
  }


  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest("POST",`${this.baseUrl}/upload`,formData,{
        responseType: 'json'
    })
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  addProduct(newProduct: ProductItem) {

    const products = this.products() as ProductItem[];
    const updatedProducts = [...products, newProduct];



    this.http.put('assets/data/products.json', { data: updatedProducts })
      .subscribe({
        next: () => console.log('Product added successfully!'),
        error: (error) => console.error('Error adding product:', error),
    });
    console.log('agregado');


    
  }

  getUserById(id: string) {
    return this.http.get<UserResponse >(`https://reqres.in/api/users/${id}`)
      .pipe(delay(1500), map(resp => resp.data));
  }

}