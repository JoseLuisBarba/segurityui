import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TitleComponent } from '@shared/title/title.component';
import { VehicleCardComponent } from '@shared/vehicle-card/vehicle-card.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    VehicleCardComponent
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VehiclesComponent {

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
