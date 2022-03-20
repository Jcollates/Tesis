import { Component, OnInit } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { Agreement } from '../../shared/models/agreements.model';
import { Simplemeet } from '../../shared/models/simplemeet.model';
import { SimpleMeetService } from '../agendamiento-citas/simple-meet.service';
import { AgreementService } from '../gestion-contratos/agreement.service';
import { EmployeeService } from '../gestion-empleados/employee.service';
import { FuntionsSharedService } from '../../../sharedAll/serviceShared/funtions-shared.service';
import { Employee } from '../../shared/models/employee.model';
import { CataloguesService } from '../../../sharedAll/serviceShared/catalogues.service';
const SERVICETYPE = 'SERVICETYPE';


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
  contracts: Agreement[] = [];
  watched: boolean = false;

  showContractDetail: boolean = false;
  showMeetDetail: boolean = false;
  contractDetail: Agreement = new Agreement();
  meetDetail: Simplemeet = new Simplemeet();
  employesAssigned: Employee[] = [];
  sizeRecordsAsigned: number = 0;
  employeesAsignated: number = 0;
  serviceTypes: SelectItem[] = [];
  
  constructor(
    private i18n: NzI18nService,
    private simpleMeetService: SimpleMeetService,
    private agreeService: AgreementService,
    private employeeService: EmployeeService,
    private sharedFuntions: FuntionsSharedService,
    private catalogueService: CataloguesService,
    ) {
  }

  ngOnInit(): void {
    this.createCols();
    this.chargeData(null);
    this.i18n.setLocale(es_ES);
    this.chargeMeets(null);
    this.getCatalogues();
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
  getCatalogues() {
    this.catalogueService.getCataloguebyCodeCat(SERVICETYPE).then(rest => {
      this.serviceTypes = this.catalogueService.constructModel(rest);
    });
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
    this.agreeService.getAgreements().subscribe(rest => {
      if (rest.length > 0) {
        console.log(rest);
        rest.forEach(item => item.elementAsArray = item.addededServices ? JSON.parse(item.addededServices) : [])
        this.contracts = rest;
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
  detailContract(contract: Agreement){
    this.showContractDetail = true;
    this.contractDetail = {...contract};
    this.getEmployeesAssigned(this.contractDetail.seqagree);
    console.log(contract);
  }
  getEmployeesAssigned(codeContract: number) {
    this.employeeService.getEmployessAssigned(null, codeContract).subscribe(res => {
      res.forEach(item => {
        item.img = this.sharedFuntions.repair(item.img);
      })
      this.employesAssigned = res;
      this.employesAssigned.length > 0 ? this.employeesAsignated = this.employesAssigned.length : 0;
      this.sizeRecordsAsigned = res.length;
      console.log(this.employesAssigned)
    });
  }

}
