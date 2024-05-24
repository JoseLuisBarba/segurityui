import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  imageUrl!:SafeUrl; 

  constructor(private sanitizer: DomSanitizer) {
    const imgRoute = 'assets/images/header/optiroute_smart_decisions.png';
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imgRoute);
  }


}
