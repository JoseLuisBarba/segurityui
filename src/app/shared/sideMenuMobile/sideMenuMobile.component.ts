import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-side-menu-mobile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './sideMenuMobile.component.html',
  styleUrl: './sideMenuMobile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuMobileComponent {

  public menuItems = routes
  .map(  route => route.children ?? [])
  .flat()
  .filter( route => route && route.path)
  .filter( route => !route.path?.includes(':'));

  constructor() {
    console.log('rutas: ', this.menuItems);
  }


}
