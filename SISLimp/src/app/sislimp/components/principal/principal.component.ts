import { Component, OnInit } from '@angular/core';
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
  nombre = 'JAIR QUIÑONEZ'
  constructor(
    private authService: AuthService
  ){

  }
  ngOnInit() {
    this.items = [
      {
        label: this.nombre
      }
    ]
    this.items2 = [
      {
        label: 'Menu',
        style: 'font-size: 0.9rem !important',
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
          }
        ]
      },
      {
        label: 'Catalogo',
        style: 'font-size: 0.9rem !important',
        items: [
          {
            label: 'Catalogo de servicios',
            icon: 'pi pi-book',
            routerLink: ['/system/catServices']
          },
          {
            label: 'Catalogo de productos',
            icon: 'pi pi-book',
            routerLink: ['/system/catProducts']
          }
        ]
      },
      {
        label: '',
        style: 'font-size: 0.9rem !important',
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
        style: 'font-size: 0.9rem !important',
        items: [
          {
            label: 'Agregar producto',
            icon: 'pi pi-book',
            routerLink: ['/system/inventory/products']
          }
        ]
      },
      {
        label: '',
        style: 'font-size: 0.9rem !important',
        items: [
          {
            label: 'Gestión de horarios',
            icon: 'pi pi-book',
            routerLink: ['/system/schedule']
          }
        ]
      }
    ];
  }
  logOut(){
    this.authService.logOut();
  }
}
