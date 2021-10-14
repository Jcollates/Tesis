import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-gestion-empleados',
  templateUrl: './gestion-empleados.component.html',
  styleUrls: ['./gestion-empleados.component.css']
})
export class GestionEmpleadosComponent implements OnInit {

  cols: any[];
  dataFromdb: any[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;
  drop: any[] = [];
  fordropt: any
  constructor() { }

  ngOnInit(): void {
    this.createCols();
    this.chargeData(null);
  }
  createCols(){
    this.cols = [
      { field: 'cedula', header: 'Cedula' },
      { field: 'name', header: 'Nombre' },
      { field: 'lastname', header: 'Apellido'},
      { field: 'birthday', header: 'Fecha nacimiento'},
      { field: 'contractday', header: 'Fecha contratación'},
      { field: 'charge', header: 'Cargo'},
      { field: 'image', header: 'Imagen'},

    ];
  }
  chargeData(event: LazyLoadEvent){
    this.dataFromdb = [
      {cedula: '0803333344', name: 'Jose', lastname: 'Pablo', birthday:'12/12/12' ,contractday:'12/12/12',charge: 'Vago',image: 'url', },
      {cedula: '0803333338', name: 'Jose', lastname: 'Pablo', birthday:'12/12/12' ,contractday:'12/12/12',charge: 'Vago',image: 'url', },
      {cedula: '0803333336', name: 'Jose', lastname: 'Pablo', birthday:'12/12/12' ,contractday:'12/12/12',charge: 'Vago',image: 'url', }
      
    ];
    this.drop = [
      { code: 1, name: 'NAME 1', text: 'Aki' },
      { code: 2, name: 'NAME 2', text: 'No' },
      { code: 3, name: 'NAME ', text: 'Se' },
    ];
  }

}
