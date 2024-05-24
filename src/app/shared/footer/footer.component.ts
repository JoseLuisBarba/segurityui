import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, booleanAttribute } from '@angular/core';



@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  

}

















