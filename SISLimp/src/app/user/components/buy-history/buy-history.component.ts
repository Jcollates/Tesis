import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-buy-history',
  templateUrl: './buy-history.component.html',
  styleUrls: ['./buy-history.component.css']
})
export class BuyHistoryComponent implements OnInit {
  cols: any[];
  dataFromdb: any[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;
  constructor() {
    this.cols = [];
   }

  ngOnInit(): void {
    this.createCols();
  }
  createCols(){
    this.cols = [
      { field: 'date', header: 'Fecha' },
      { field: 'productservice', header: 'Producto / Servicio' },
      { field: 'cost', header: 'Costo'},
      { field: 'detail', header: 'Detalle'},
    ]
  }
  chargeData(event: LazyLoadEvent){
    this.dataFromdb = [
      {date: '17/12/2021', productservice: 'CEPILLO', cost: '$15', detail: 'Cepillo para cepillar ' },
      {date: '17/12/2021', productservice: 'ASEO', cost: '$16', detail: 'Para limpiar ' },
      {date: '17/12/2021', productservice: 'CAMBIO', cost: '$18', detail: 'Para comer ' },
      {date: '17/12/2021', productservice: 'DETERJENTE', cost: '$5', detail: 'Para probar ' },
    ]
  }

}