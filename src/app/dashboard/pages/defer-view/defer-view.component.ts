import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeavyLoadersSlowComponent } from '@shared/heavy-loaders/heavy-loaders-slow.component';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-defer-view',
  standalone: true,
  imports: [
    CommonModule,
    HeavyLoadersSlowComponent,
    TitleComponent
  ],
  templateUrl: './defer-view.component.html',
  styleUrl: './defer-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeferViewComponent {
  public title: string = 'Defer Views / Blocs';
}
