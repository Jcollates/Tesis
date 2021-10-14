import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-catalogo-products',
  templateUrl: './catalogo-products.component.html',
  styleUrls: ['./catalogo-products.component.css']
})
export class CatalogoProductsComponent implements OnInit {
  cols: any[];
  dataFromdb: any[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;
  constructor() { }

  ngOnInit(): void {
    this.createCols();
    this.chargeData(null);
  }
  createCols(){
    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripción'},
      { field: 'precioventa', header: 'Precio venta'},
      { field: 'image', header: 'Imagen'},

    ];
  }
  chargeData(event: LazyLoadEvent){
    this.dataFromdb = [
      {code: 1, name: 'Creso', description: 'Testing', precioventa: 12.00 ,image: 'url', },
      {code: 2, name: 'Creso', description: 'Testing', precioventa: 12.00 ,image: 'url', },
      {code: 3, name: 'Creso', description: 'Testing', precioventa: 12.00 ,image: 'url', },
    ]
  }

}
