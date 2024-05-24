
import { ChangeDetectionStrategy, Directive, Component, ElementRef, SimpleChanges, OnChanges, signal, computed, inject, HostListener} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@shared/footer/footer.component';
import { SideMenuMobileComponent } from '@shared/sideMenuMobile/sideMenuMobile.component';
import { SidemenuComponent } from '@shared/sidemenu/sidemenu.component';

interface State {
  content: boolean
}



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    SidemenuComponent,
    SideMenuMobileComponent,
    FooterComponent
    
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {

  constructor(private elementRef: ElementRef<HTMLElement>) { }


  #state = signal<State>({
    content: true
  });

  public wContent = computed( () => this.#state().content );


  @HostListener('window:resize')
  onResize() {
    const isDesktop = window.innerWidth >= 768;  
    this.#state.update(
      value => ({
        ...value,
        content: isDesktop ? true : false
      })
    );
  }


  
  




}
