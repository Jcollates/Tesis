import { Component, OnInit } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import { LazyLoadEvent } from 'primeng/api';
import { Simplemeet } from '../../shared/models/simplemeet.model';
import { SimpleMeetService } from '../agendamiento-citas/simple-meet.service';




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

  //data
  meets: Simplemeet[] = [];
  constructor(
    private i18n: NzI18nService,
    private simpleMeetService: SimpleMeetService,
    ) {
  }

  ngOnInit(): void {
    this.createCols();
    this.chargeData(null);
    this.i18n.setLocale(es_ES);
    this.chargeMeets(null);
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
  chargeMeets(event: LazyLoadEvent) {
    this.simpleMeetService.getSimpleMeets().subscribe(rest => {
      if (rest.length > 0) {
        rest.forEach(item => item.elementAsArray = item.addededServices ? JSON.parse(item.addededServices) : [])
        this.meets = rest.filter(item => item.status !== 'process' && item.status !== 'hold');
        console.log('dataFromdb', this.meets);
      }

    });
  }
  getMonthData(date: Date, dateCalendar: Date): true | false {
    console.log(new Date(date).getTime(), dateCalendar.getTime());
    if (new Date(date) == date) {
      
      return true;
    }
    return false;
  }

}
