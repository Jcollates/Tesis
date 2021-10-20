import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-gestion-provedores',
  templateUrl: './gestion-provedores.component.html',
  styleUrls: ['./gestion-provedores.component.css']
})
export class GestionProvedoresComponent implements OnInit {
  products: any[] = [];
  drop: any[] = [];
  fordropt: any
  //table
  cols: any[];
  dataFromdb: any[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;
  constructor() { }

  ngOnInit(): void {
    this.drop = [
      { code: 1, name: 'NAME 1', text: 'Aki' },
      { code: 2, name: 'NAME 2', text: 'No' },
      { code: 3, name: 'NAME ', text: 'Se' },
    ];
    this.createCols();
    this.chargeData(null);
  }

  createCols() {
    this.cols = [
      { field: 'codeProvi', header: 'Código proveedor' },
      { field: 'ruc', header: 'RUC' },
      { field: 'name', header: 'Nombre empresa' },
      { field: 'address', header: 'Dirección' },
      { field: 'phone', header: 'Num. Teléfono' },
      { field: 'city', header: 'Ciudad' },
      { field: 'province', header: 'Provincia' },
      { field: 'detail', header: 'Detalles' },
      { field: 'typepay', header: 'Tipo de pago' },
      { field: 'salesmanname', header: 'Nombre vendedor' },

    ];
  }
  chargeData(event: LazyLoadEvent) {
    this.dataFromdb = [
      {
        codeProvi: '3625',
        ruc: '0803392564001',
        name: 'Papeles de carlos',
        address: 'Jamaicay Benecia',
        phone: '09999999999',
        city: 'Quito',
        province: 'Pichincha', 
        detail: 'Data de prueba data de prueba data de prueba ', 
        typepay: 'Efectivo',
        salesmanname: 'Pepe Lucio'
      },
      {
        codeProvi: '3625',
        ruc: '0803392564001',
        name: 'Papeles de carlos',
        address: 'Jamaicay Benecia',
        phone: '09999999999',
        city: 'Quito',
        province: 'Pichincha', 
        detail: 'Data de prueba data de prueba data de prueba ', 
        typepay: 'Efectivo',
        salesmanname: 'Pepe Lucio'
      }
    ]
  }
}
