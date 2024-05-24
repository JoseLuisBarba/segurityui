import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoadingComponent { }
