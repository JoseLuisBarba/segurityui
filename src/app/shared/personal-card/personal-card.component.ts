import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-personal-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './personal-card.component.html',
  styleUrl: './personal-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalCardComponent { 

  imageUrl!:SafeUrl; 
  imageFlete!:SafeUrl;
  imageSkill!:SafeUrl;

  constructor(private sanitizer: DomSanitizer){
    const imgRoute = 'assets/images/personal/she.png';
    const imgSkillRoute = 'assets/images/personal/point_skill.svg';
    const imgFleteRoute = 'assets/images/icons/flete.svg';
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imgRoute);
    this.imageFlete = this.sanitizer.bypassSecurityTrustUrl(imgSkillRoute);
    this.imageSkill = this.sanitizer.bypassSecurityTrustUrl(imgFleteRoute);
  }

}
