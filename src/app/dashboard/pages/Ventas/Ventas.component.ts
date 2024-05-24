import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Ventas.component.html',
  styleUrl: './Ventas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VentasComponent { }
