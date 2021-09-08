import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  cards: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.cards = [
      {
        date: 'Mayo 11 de 2021',
        name: 'Cepillos',
        about: 'Hablando sobre pedidos que nuca llegaran ',
        status: 'COMPLETO'

      },
      {
        date: 'Abril 11 de 2021',
        name: 'Limpieza interna',
        about: 'Hablando sobre pedidos que nuca llegaran',
        status: 'COMPLETO'

      },
      {
        date: 'Julio 11 de 2021',
        name: 'Limpieza interna',
        about: 'Hablando sobre pedidos que nuca llegaran ',
        status: 'PENDIENTE'

      },
      {
        date: 'Mayo 11 de 2021',
        name: 'Decinfectante',
        about: 'Hablando sobre pedidos que nuca llegaran',
        status: 'PENDIENTE'

      },
      {
        date: 'Agosto 11 de 2021',
        name: 'Aseo de oficina',
        about: 'Hablando sobre pedidos que nuca llegaran',
        status: 'PENDIENTE'

      },
      {
        date: 'Mayo 11 de 2021',
        name: 'Aseo de oficina',
        about: 'Hablando sobre pedidos que nuca llegaran',
        status: 'PENDIENTE'

      },
      {
        date: 'Mayo 11 de 2021',
        name: 'Aseo de oficina',
        about: 'Hablando sobre pedidos que nuca llegaran',
        status: 'COMPLETO'

      }
    ]
  }

}
