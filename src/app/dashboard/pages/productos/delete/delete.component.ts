import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ProductItem } from '@interfaces/product';
import { ProductService } from '@services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteComponent {

  @Input() productItem?: ProductItem;

  private productService = inject(ProductService);
  private toastrService = inject(ToastrService);

  delete(){
    this.productService.delete(this.productItem);
    this.toastrService.warning(`Producto ${this.productItem?.name} fue eliminado`, '¡Advertencia!', { timeOut: 5000 });
  }



}
