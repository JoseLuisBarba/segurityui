import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleCardComponent { 

  imageUrl!:SafeUrl; 
  imageFlete!:SafeUrl;
  imageSkill!:SafeUrl;

  constructor(private sanitizer: DomSanitizer){
    const imgRoute = 'assets/images/vehicles/vehicle.png';
    const imgSkillRoute = 'assets/images/icons/person.svg';
    const imgFleteRoute = 'assets/images/icons/flete.svg';
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imgRoute);
    this.imageFlete = this.sanitizer.bypassSecurityTrustUrl(imgSkillRoute);
    this.imageSkill = this.sanitizer.bypassSecurityTrustUrl(imgFleteRoute);

  }

}
