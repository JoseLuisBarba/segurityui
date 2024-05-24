import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ProductService } from '@services/product.service';
import { TitleComponent } from '@shared/title/title.component';
import ProductTableComponent from './product-table/product-table.component';
import { ProductItem } from '@interfaces/product';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ProductTableComponent, 
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductosComponent  { 
  
}








