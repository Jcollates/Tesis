import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-calendar-all',
  templateUrl: './calendar-all.component.html',
  styleUrls: ['./calendar-all.component.css']
})
export class CalendarAllComponent implements OnInit {
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
      { field: 'code', header: 'Código cita' },
      { field: 'contractCode', header: 'Código contrato' },
      { field: 'employeecode', header: 'Código empleado' },
      { field: 'day', header: 'Día' },
      { field: 'month', header: 'Mes' },
      { field: 'schedule', header: 'Horario' },
      { field: 'typeservice', header: 'Tipo servicio' },
      { field: 'tools', header: 'Materiales' },
      { field: 'status', header: 'Estado' },


    ];
  }
  chargeData(event: LazyLoadEvent) {
    this.dataFromdb = [
      {
        code: 1,
        contractCode: 2,
        employeecode: '586959',
        day: 12,
        month: 5,
        schedule: '14h - 18h',
        typeservice: 'Limpieza',
        tools: 'SI',
        status: 'PENDIENTE',
      },

    ];
  }

}
