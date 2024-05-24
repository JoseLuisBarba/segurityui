import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TitleComponent } from '@shared/title/title.component';
import { PersonalCardComponent } from '@shared/personal-card/personal-card.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    CommonModule,
    PersonalCardComponent,
    TitleComponent
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PersonalComponent { 


  addIconUrl!:SafeUrl; 
  searchIconUrl!:SafeUrl; 
  

  constructor(private sanitizer: DomSanitizer){
    this.addIconUrl = this.getIcon('assets/images/custom/add_user.svg');
    this.searchIconUrl = this.getIcon('assets/images/custom/search.svg');
  }

  getIcon(iconRoute: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(iconRoute);
  }


}
