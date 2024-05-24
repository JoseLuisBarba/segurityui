import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from '@shared/title/title.component';
import { User } from '@interfaces/req-response';
import {toSignal} from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';
import { computed } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent
  ],
  template: `
    <app-title [title]="titleLabel()"/>
    @if( user()) {
      <img 
        [srcset]="user()!.avatar" 
        [alt]="user()!.first_name"
      />
      <div>
        <h3>{{user()!.first_name}} {{user()!.last_name}}</h3>
        <p>{{user()!.email}}</p>
      </div>
    } @else {
      <p>Cargando información</p>
    }

  `,
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {

  private route = inject( ActivatedRoute);
  private usersService = inject( UsersService);
  
  public user = toSignal(
    this.route.params.pipe(
      switchMap( ({id}) => this.usersService.getUserById(id))
    )
  );

  public titleLabel = computed( () => {
    if(this.user()) {
      return `Información del usuario: ${this.user()?.first_name} ${this.user()?.last_name}`
    }

    return `Información del usuario`;
  });


}
