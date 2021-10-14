import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-atencion-cliente',
  templateUrl: './atencion-cliente.component.html',
  styleUrls: ['./atencion-cliente.component.css']
})
export class AtencionClienteComponent implements OnInit {
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

  createCols(){
    this.cols = [
      { field: 'codeCli', header: 'Codigo cliente' },
      { field: 'date', header: 'Fecha' },
      { field: 'name', header: 'Nombre' },
      { field: 'lastname', header: 'Apellido'},
      { field: 'observation', header: 'Observaciones'},
      { field: 'phone', header: 'Num. Telefono'},
      { field: 'addres', header: 'Dirección'},
      { field: 'employe', header: 'Nombre empleado'},
      { field: 'detailservice', header: 'Detalle del servicio '}
    ];
  }
  chargeData(event: LazyLoadEvent){
    this.dataFromdb = [
      {codeCli: '0803392564', date: '17/12/2021', name: 'Carlos', lastname: 'Arana', observation: 'No hizo su trabajo',phone: '09999999999',addres: 'La calle', employe: 'Albeerto',detailservice: 'limpiar casa'},
      {codeCli: '0803392564', date: '18/12/2021', name: 'Pepe', lastname: 'Arana', observation: 'No hizo su trabajo',phone: '09999999999',addres: 'La calle', employe: 'Albeerto',detailservice: 'limpiar casa'},
      {codeCli: '0803392564', date: '20/12/2021', name: 'Jose', lastname: 'Arana', observation: 'No hizo su trabajo',phone: '09999999999',addres: 'La calle', employe: 'Albeerto',detailservice: 'limpiar casa' },
    ]
  }

}
