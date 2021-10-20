import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-gestion-inventario-products',
  templateUrl: './gestion-inventario-products.component.html',
  styleUrls: ['./gestion-inventario-products.component.css']
})
export class GestionInventarioProductsComponent implements OnInit {

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
      { field: 'codepro', header: 'Código producto' },
      { field: 'cuantity', header: 'Cantidad' },
      { field: 'name', header: 'Nombre' },
      { field: 'saleprice', header: 'Precio venta' },
      { field: 'datebuy', header: 'Fecha compra' },
      { field: 'provider', header: 'Poveedor' }
    ];
  }
  chargeData(event: LazyLoadEvent) {
    this.dataFromdb = [
      {
        codepro: 1,
        cuantity: 5,
        name: 'Papeles de carlos',
        saleprice: 20.15,
        datebuy: '12/12/2021',
        provider: 'Carl´s'
      },
      {
        codepro: 2,
        cuantity: 5,
        name: 'Papeles de carlos',
        saleprice: 20.15,
        datebuy: '12/12/2021',
        provider: 'Carl´s'
      },

    ]
  }

}
