import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidemenuComponent { 



  public menuItems = routes
    .map(  route => route.children ?? [])
    .flat()
    .filter( route => route && route.path)
    .filter( route => !route.path?.includes(':'));

  constructor() {
    console.log('rutas: ', this.menuItems);
  }
  



}
