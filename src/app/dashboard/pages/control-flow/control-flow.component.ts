import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

type Grade = 'A' | 'B' | 'C';


@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
  ],
  templateUrl: './control-flow.component.html',
  styleUrl: './control-flow.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class ControlFlowComponent { 

  public showContent = signal(false);
  public grade = signal<Grade>('A');
  public frameworks = signal(['Angular', 'Vue', 'React', 'Svelte', 'Qwik']);
  public frameworks2 = signal([]);
  public title: string = 'Control Flow';

  public toggleContent(){
    this.showContent.update( value => !value);
  }


}
