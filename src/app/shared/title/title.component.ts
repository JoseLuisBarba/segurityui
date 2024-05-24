import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, booleanAttribute } from '@angular/core';



@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './title.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  
  @Input({required: true}) title!: string;
  @Input() subtitle!: string;
  @Input({transform: booleanAttribute}) withShadow: boolean = false;




}
