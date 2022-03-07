import { AfterViewInit, Component, forwardRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){

  }
  items: MenuItem[];
  items2: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-file',
        command: () => this.router.navigate(['/page/products'])
      },
      {
        label: 'Servicios',
        icon: 'pi pi-fw pi-file',
        command: () => this.router.navigate(['/page/services'])
      }
    ];
    this.items2 = [{
      label: 'Menu',
      style: 'font-size: 0.9rem !important', 
      items: [
        {
          label: 'Historial de compras',
          icon: 'pi pi-th-large',
          routerLink: ['/user/bouyhysto']

        },
        {
          label: 'Pedidos',
          icon: 'pi pi-shopping-cart',
          routerLink: ['/user/orders']
        },
        {
          label: 'Detalle de la cuenta',
          icon: 'pi pi-user',
          routerLink: ['/user/accountdetail']
        },
        {
          separator: true
        },
        {
          label: 'Salir',
          badge: '2',
          icon: 'pi pi-sign-out',
          routerLink: ['/page/login'],
          command: () => this.authService.logOut()
          
        }
      ]
    }
    ];
  }


}
