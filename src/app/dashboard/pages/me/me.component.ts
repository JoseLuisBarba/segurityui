import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MeComponent {

  public name: string = 'Jose Luis Barba Farro';
  public email: string = 'j.barba@pepes.alimentos.com'
  public user: string = '@JBarba'

}
