import { Component, OnInit } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { LazyLoadEvent } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';



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
  date = new Date();
  mode: NzCalendarMode = 'month';
  constructor() { }

  ngOnInit(): void {
    registerLocaleData(en);
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
  

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }

}
