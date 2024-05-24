import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProduccionTableComponent } from './produccionTable/produccionTable.component';


@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [
    CommonModule,
    ProduccionTableComponent
  ],
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProduccionComponent {

  
}
