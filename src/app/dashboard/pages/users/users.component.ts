import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { UserCardComponent } from '@shared/user-card/user-card.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    RouterModule,
    UserCardComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent {

  addIconUrl!:SafeUrl; 
  searchIconUrl!:SafeUrl; 

  public usersServices = inject( UsersService);

  constructor(private sanitizer: DomSanitizer){
    this.addIconUrl = this.getIcon('assets/images/custom/add_user.svg');
    this.searchIconUrl = this.getIcon('assets/images/custom/search.svg');
  }
  getIcon(iconRoute: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(iconRoute);
  }

}
