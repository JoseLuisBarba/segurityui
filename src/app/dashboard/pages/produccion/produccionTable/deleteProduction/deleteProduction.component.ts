import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ProductionItem } from '@interfaces/production'; 
import { ProductionService } from '@services/production.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-production',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './deleteProduction.component.html',
  styleUrl: './deleteProduction.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteProductionComponent {

  @Input() productItem?: ProductionItem;

  private toastrService = inject(ToastrService);
  private productService = inject(ProductionService);

  delete(){
    this.productService.delete(this.productItem);
    this.toastrService.warning(`Producción ${this.productItem?.name}-${this.productItem?.creationDate} fue eliminada`, '¡Advertencia!', { timeOut: 5000 });
  }


}
