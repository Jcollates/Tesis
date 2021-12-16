import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-agendamiento-citas',
  templateUrl: './agendamiento-citas.component.html',
  styleUrls: ['./agendamiento-citas.component.css']
})
export class AgendamientoCitasComponent implements OnInit {

  cars: any[] = [];
  products: any[] = [];
  drop: any[] = [];
  fordropt: any
  
  //table
  cols: any[];
  dataFromdb: any[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;

  //employees
  colsEmployees: any[] = [];
  employesToAssig: any[] = [];
  showEmployes: boolean = false;
  constructor() { }
  ngOnInit(): void {
    this.products = [
      { code: 1, name: 'NAME', category: 'TESTING', quantity: 1000 },
      { code: 1, name: 'NAME', category: 'TESTING', quantity: 1000 },
      { code: 1, name: 'NAME', category: 'TESTING', quantity: 1000 },
    ];
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
      { field: 'date', header: 'Fecha' },
      { field: 'status', header: 'Estado' },
      { field: 'client', header: 'Cliente'},
      { field: 'agent', header: 'Agendador'},
      { field: 'employeasi', header: 'Empelado asignado'},
      { field: 'daysassigned', header: 'Dias asignados'},
      { field: 'basecost', header: 'Valor base'},
      { field: 'totalcost', header: 'Valor total'},
      { field: 'toolsneed', header: 'Utencilios incluidos'},
      { field: '', header: 'Asignar empleado'},
    ]
    this.colsEmployees = [
      { field: 'nameEmploye', header: 'Nombre' },
      { field: 'charge', header: 'Cargo' },
    ]
  }
  chargeData(event: LazyLoadEvent){
    this.dataFromdb = [
      {date: '17/12/2021', status: 'PENDIENTE', client: 'Jair', agent: 'Jafferson',employeasi: 'Pablo',daysassigned: 12, basecost: 40,totalcost: 300, toolsneed: 'SI' },
      {date: '18/12/2021', status: 'CONCLUIDO', client: 'Carlos', agent: 'Jafferson',employeasi: 'Pedro',daysassigned: 12, basecost: 70,totalcost: 900, toolsneed: 'SI' },
      {date: '20/12/2021', status: 'CANCELADO', client: 'Jose', agent: 'Jafferson',employeasi: 'Pablo',daysassigned: 12, basecost: 60,totalcost: 300, toolsneed: 'SI' },
    ]
  }
  showAssignation(){
    this.showEmployes = true;
    this.employesToAssig = [
      {nameEmploye: 'Empleado 1', charge: 'Limpiador'},
      {nameEmploye: 'Empleado 2 ', charge: 'Piscinero'},
      {nameEmploye: 'Empleado 3', charge: 'Carpintero'},
      
    ]
  }

}
