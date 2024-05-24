import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserCardComponent {


  /**
   * Inputs
  */

  @Input({ required: true}) id!: string;
  @Input({ required: true}) avatarUrl!: string;
  @Input({ required: true}) name!: string;
  @Input({ required: true}) age!: string;
  @Input({ required: true }) skillPoints!: string;
  @Input({ required: true }) timeDate!: string;
  @Input({ required: true }) serviceTime!: string;
  @Input({ required: true }) email!: string;
  @Input({ required: true }) numberPhone!: string;

  imageUrl!:SafeUrl; 
  imageFlete!:SafeUrl;
  imageSkill!:SafeUrl;
  imageEmail!:SafeUrl;
  imagePhone!:SafeUrl;
  imageClock!:SafeUrl;

  constructor(private sanitizer: DomSanitizer){

    this.imageUrl = this.getIcon(this.avatarUrl);
    this.imageFlete = this.getIcon('assets/images/icons/flete.svg');
    this.imageSkill = this.getIcon('assets/images/personal/point_skill.svg');
    this.imageEmail = this.getIcon('assets/images/custom/email.svg');
    this.imagePhone = this.getIcon('assets/images/custom/phone.svg');
    this.imageClock = this.getIcon('assets/images/custom/clock.svg');
  }

  getIcon(iconRoute: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(iconRoute);
  }

}

 