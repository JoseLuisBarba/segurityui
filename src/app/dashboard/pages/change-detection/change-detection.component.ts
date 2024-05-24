import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent
  ],
  templateUrl: './change-detection.component.html',
  styleUrl: './change-detection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChangeDetectionComponent {

  public currentFramework = computed(
    () => `Change detection - ${this.frameworkAsSignal().name}`
  );

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  });

  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016,
  };

  constructor() {
    setTimeout(() => {
      this.frameworkAsSignal.update(value => ({
        ...value,
        name: 'React'
      }));
      console.log('Hecho');
    }, 3000);
  }

}
