import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-catalogo-services',
  templateUrl: './catalogo-services.component.html',
  styleUrls: ['./catalogo-services.component.css']
})
export class CatalogoServicesComponent implements OnInit {
  cols: any[];
  dataFromdb: any[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;
  drop: any[] = [];
  fordropt: any;
  constructor() { }

  ngOnInit(): void {
    this.createCols();
    this.chargeData(null);
  }
  createCols() {
    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'type', header: 'Tipo' },
      { field: 'name', header: 'Nombre' },
      { field: 'pricemeter', header: 'Precio por metro' },
      { field: 'pricehour', header: 'Precio por hora' },
      { field: 'basehours', header: 'Horas base' },
      { field: 'description', header: 'Descripción' },
      { field: 'image', header: 'Imagen' },

    ];
  }
  chargeData(event: LazyLoadEvent) {
    this.dataFromdb = [
      { code: 1, type: 'Limpia', name: 'Creso', pricemeter: 2, pricehour: 5, basehours: 2, description: 'Testing', precioventa: 12.00, image: 'url', },
      { code: 2, type: 'Limpia', name: 'Creso', pricemeter: 2, pricehour: 5, basehours: 2, description: 'Testing', precioventa: 12.00, image: 'url', },
      { code: 3, type: 'Limpia', name: 'Creso', pricemeter: 2, pricehour: 5, basehours: 2, description: 'Testing', precioventa: 12.00, image: 'url', }

    ];
    this.drop = [
      { code: 1, name: 'NAME 1', text: 'Aki' },
      { code: 2, name: 'NAME 2', text: 'No' },
      { code: 3, name: 'NAME ', text: 'Se' },
    ];
  }

}
