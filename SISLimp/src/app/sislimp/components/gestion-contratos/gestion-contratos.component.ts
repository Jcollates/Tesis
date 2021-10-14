import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-gestion-contratos',
  templateUrl: './gestion-contratos.component.html',
  styleUrls: ['./gestion-contratos.component.css']
})
export class GestionContratosComponent implements OnInit {

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
  showEmployesAssigned: boolean = false;
  showEmployes: boolean = false;
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
      { field: 'codeContract', header: 'Código contrato' },
      { field: 'datestart', header: 'Fecha inicio' },
      { field: 'dateend', header: 'Fecha fin' },
      { field: 'nameEnterprice', header: 'Nombre empresa' },
      { field: 'respresent', header: 'Responsable empresa' },
      { field: 'typeservice', header: 'Tipo servicio' },
      { field: 'status', header: 'Estado' },
      { field: 'supervisor', header: 'Nombre supervisor' },
      { field: 'employees', header: 'Cantidad de empleados' },
      { field: '', header: 'Empleados asignados' },
      { field: 'tools', header: 'Utencilios' },
      { field: '', header: 'Asignar empleado' },
    ]
    this.colsEmployees = [
      { field: 'nameEmploye', header: 'Nombre' },
      { field: 'charge', header: 'Cargo' },
    ]
  }
  chargeData(event: LazyLoadEvent) {
    this.dataFromdb = [
      {
        codeContract: 1,
        datestart: '17/12/2021',
        dateend: '30/12/2021',
        nameEnterprice: 'Jafferson LICORES',
        respresent: 'Pablo Jose de la calle',
        typeservice: 2,
        status: 'En proceso',
        supervisor: 'Juan Manuel',
        employees: 50,
        tools: 'SI'
      },
    ]
  }
  showAssignation() {
    this.showEmployes = true;
    this.employesToAssig = [
      { nameEmploye: 'Empleado 1', charge: 'Limpiador' },
      { nameEmploye: 'Empleado 2 ', charge: 'Piscinero' },
      { nameEmploye: 'Empleado 3', charge: 'Carpintero' },
    ]
  }
  showAssignated(){
    this.showEmployesAssigned = true;
    this.employesToAssig = [
      { nameEmploye: 'Empleado 1', charge: 'Limpiador' },
      { nameEmploye: 'Empleado 2 ', charge: 'Piscinero' },
      { nameEmploye: 'Empleado 3', charge: 'Carpintero' },
    ]
  }

}
