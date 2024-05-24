import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users-loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template:`<p>hello world</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersLoaderComponent { }
