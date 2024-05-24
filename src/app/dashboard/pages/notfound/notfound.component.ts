import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, signal, computed, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FooterComponent } from '@shared/footer/footer.component';
import { SideMenuMobileComponent } from '@shared/sideMenuMobile/sideMenuMobile.component';
import { SidemenuComponent } from '@shared/sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';


interface State {
  content: boolean,
  with: number,
  hight: number
}

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuMobileComponent,
    SidemenuComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotfoundComponent { 

  bgImg!: SafeUrl;
  bgmbImg!: SafeUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef<HTMLElement>
  ){
    this.bgImg = this.getImg('assets/images/notfound/notfounddk.png');
    this.bgmbImg = this.getImg('assets/images/notfound/notfoundmb.png');
  }
  getImg(imgRoute: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imgRoute);
  }

  #state = signal<State>({
    content: true,
    hight: window.innerHeight,
    with: window.innerWidth
  });

  public wContent = computed( () => this.#state() );


  @HostListener('window:resize')
  onResize() {
    const isDesktop = window.innerWidth >= 768;   
    this.#state.update(
      value => ({
        ...value,
        content: isDesktop ? true : false,
        hight: window.innerHeight,
        with: window.innerWidth
      })
    );
  }


}
