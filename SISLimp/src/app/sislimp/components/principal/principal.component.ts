import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  items: MenuItem[];
  items2: MenuItem[];
  nombre = 'JAIR QUIÑONEZ';
  thechild: any;
  thehead: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private router: Router,

  ){

  }
  ngOnInit() {
    this.items = [
      // {
      //   label: `<h4>Asoserlat</h4>`,
      //   escape: false,
        
      // },
      {
        label: this.authService.username,
        icon: 'fa fa-users',
      },
      
    ]
    this.items2 = [
      {
        label: 'Citas',
        icon: 'pi pi-fw pi-tags',
        
        items: [
          {
            label: 'Angendamiento de citas',
            icon: 'pi pi-th-large',
            routerLink: ['/system/booking']

          },
          {
            label: 'Atencion al cliente',
            icon: 'pi pi-shopping-cart',
            routerLink: ['/system/customerattention']
          },
          {
            label: 'Gestión de servicios',
            icon: 'pi pi-users',
            routerLink: ['/system/servicesmanagement']
          },
          {
            label: 'Gestión de solicitudes',
            icon: 'pi pi-users',
            routerLink: ['/system/solmanagement']
          }
        ]
      },
      {
        label: 'Catálogos',
        icon:'fa fa-cubes',
        
        items: [
          {
            label: 'Catálogo de servicios',
            icon: 'pi pi-book',
            routerLink: ['/system/catServices']
          },
          {
            label: 'Catálogo de productos',
            icon: 'pi pi-book',
            routerLink: ['/system/catProducts']
          }
        ]
      },
      {
        
        label: 'Empleados y proveerdores',
        icon:'fa fa-users',
        
        items: [
          {
            label: 'Gestión de empleados',
            icon: 'pi pi-book',
            routerLink: ['/system/employees']
          },
          {
            label: 'Gestión de contratos',
            icon: 'pi pi-book',
            routerLink: ['/system/contracts']
          },
          {
            label: 'Gestión de proveedores',
            icon: 'pi pi-book',
            routerLink: ['/system/providers']
          }
        ]
      },
      {
        label: 'Gestión de inventario',
        icon:'pi pi-book',
        
        items: [
          {
            label: 'Productos',
            icon: 'pi pi-book',
            routerLink: ['/system/inventory/products']
          }
        ]
      },
      {
        label: 'Calendario',
        icon:' pi pi-calendar-plus',
        
        items: [
          {
            label: 'Gestión de horarios',
            icon: 'pi pi-book',
            routerLink: ['/system/schedule']
          }
        ]
      },
      {
        label: 'Usuarios',
        icon:'pi pi-users',
        
        items: [
          {
            label: 'Gestión de usuarios',
            icon: 'pi pi-user',
            routerLink: ['/system/users']
          }
        ]
      },
    ];
    this.loadStyle();
  }
  ngOnDestroy() {
    this.removeStyle();

  }
  logOut(){
    this.authService.logOut();
    this.router.navigate(['system/login'])
  }
  loadStyle(styleName: string = 'ngzorro.css') {
    const head = this.document.getElementsByTagName('head')[0];
    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head.appendChild(style);
      this.thehead = head;
      this.thechild = style;
    }
  }
  removeStyle() {
    this.thehead.removeChild(this.thechild);
  }
}
