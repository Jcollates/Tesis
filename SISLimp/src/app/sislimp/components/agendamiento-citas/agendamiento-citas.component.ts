import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { FuntionsSharedService } from 'src/app/sharedAll/serviceShared/funtions-shared.service';
import { Employee } from '../../shared/models/employee.model';
import { Simplemeet } from '../../shared/models/simplemeet.model';
import { AgreementService } from '../gestion-contratos/agreement.service';
import { EmployeeService } from '../gestion-empleados/employee.service';
import { SimpleMeetService } from './simple-meet.service';
const CITYCAT = 'CITYCAT';
const PROVINCECAT = 'PROVINCECAT';
const SERVICETYPE = 'SERVICETYPE';
const REQUESTSTATUSCAT = 'REQUESTSTATUSCAT';
@Component({
  selector: 'app-agendamiento-citas',
  templateUrl: './agendamiento-citas.component.html',
  styleUrls: ['./agendamiento-citas.component.css'],
  providers: [MessageService]
})
export class AgendamientoCitasComponent implements OnInit {

  cars: any[] = [];
  drop: SelectItem[] = [];
  fordropt: any
  dropCity: SelectItem[] = [];
  dropProvince: SelectItem[] = [];
  dropType: SelectItem[] = [];
  dropCityTwo: SelectItem[] = [];
  dropCityTwoProcesed: SelectItem[] = [];
  dropTools: SelectItem[] = [
    { value: '', label: 'Seleccione' },
    { value: 'SI', label: 'Si' },
    { value: 'NO', label: 'No' }
  ];
  //table
  cols: any[];
  dataFromdb: Simplemeet[] = [];
  dataFromdbProcesed: Simplemeet[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;

  //employees
  colsEmployees: any[] = [];
  showEmployes: boolean = false;
  showEmployesAssignated: boolean = false;
  showEmployesAssigned: boolean = false;
  sizeRecordsToAsig: number = 10;
  sizeRecordsAsigned: number = 10;
  employesToAssig: Employee[] = [];
  employesAssigned: Employee[] = [];
  employeesAsignated: number = 0;

  selectdEmployes: Employee[] = [];
  selectedFather: Simplemeet = new Simplemeet();

  //fomrs
  formCita: FormGroup = new FormGroup({});
  simpleMeet: Simplemeet = new Simplemeet();

  //sevice extras
  extraServices: ServiceAdd[] = [];
  constructor(
    private simpleMeetService: SimpleMeetService,
    private formBuilder: FormBuilder,
    private catalogueService: CataloguesService,
    private messageService: MessageService,
    private agreeService: AgreementService,
    private emplyeeservice: EmployeeService,
    private sharedFuntions: FuntionsSharedService,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.createCols();
    this.createForm();
    this.getCatalogues();
  }

  createCols() {
    this.cols = [
      { field: 'date', header: 'Fecha inicio' },
      { field: 'dateEnd', header: 'Fecha fin' },
      { field: 'status', header: 'Estado' },
      { field: 'client', header: 'Cliente' },
      { field: 'agent', header: 'Agendador' },
      { field: 'daysassigned', header: 'Dias asignados' },
      { field: 'basecost', header: 'Valor estimado' },
      { field: 'toolsneed', header: 'Utencilios incluidos' },
      { field: '', header: 'Ver/Asignar empleado' },
    ]
    this.colsEmployees = [
      { field: 'nameEmploye', header: 'Nombre' },
      { field: 'charge', header: 'Cargo' },
    ]
  }
  chargeData(event: LazyLoadEvent) {
    this.simpleMeetService.getSimpleMeets().subscribe(rest => {
      if (rest.length > 0) {
        this.dataFromdb = rest.filter(item => item.status !== 'cancel' && item.status !== 'success');
        this.dataFromdbProcesed = rest.filter(item => item.status === 'cancel' || item.status === 'success');
        this.dataFromdb.forEach(item => this.completeCityDrop(item.cliProvince, 'dataFromdb'));
        this.dataFromdbProcesed.forEach(item => this.completeCityDrop(item.cliProvince, 'dataFromdbProcesed'));
        console.log('dataFromdb', this.dataFromdb);
      }

    });
  }
  completeCityDrop(codeFather: string, array: string) {
    this.catalogueService.getCataloguebyCodeCatAndCodeFather(CITYCAT, PROVINCECAT, codeFather).then(rest => {
      if (rest) {
        if(array == 'dataFromdb') this.dropCityTwo.push(rest[0]);
        else this.dropCityTwoProcesed.push(rest[0]);
      }
    });

  }



  createForm() {
    this.formCita = this.formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      typeService: ['', Validators.required],
      serviceName: ['', Validators.required],
      hoursNumber: ['', Validators.required],
      dateService: ['', Validators.required],
      dateEnd: ['', Validators.required],
      tools: ['', Validators.required],
    });
  }
  validateForm() {

    if (!this.formCita.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario no valido' });
      console.log(this.formCita.value);
    } else {
      console.log(this.formCita.value);
      this.simpleMeet.dateService = this.formCita.controls.dateService.value;
      this.simpleMeet.address = this.formCita.controls.address.value;
      this.simpleMeet.cliName = this.formCita.controls.name.value;
      this.simpleMeet.cliLastName = this.formCita.controls.lastname.value;
      this.simpleMeet.cliDni = this.formCita.controls.dni.value;
      this.simpleMeet.cliEmail = this.formCita.controls.email.value;
      this.simpleMeet.cliCity = this.formCita.controls.city.value;
      this.simpleMeet.cliProvince = this.formCita.controls.province.value;
      this.simpleMeet.typeService = this.formCita.controls.typeService.value;
      this.simpleMeet.services = this.formCita.controls.serviceName.value;
      this.simpleMeet.hoursStimated = this.formCita.controls.hoursNumber.value;
      this.simpleMeet.codeUser = this.authService.codeUser;
      this.simpleMeet.phone = this.formCita.controls.phone.value;
      //falta tools, valor estiamdo y fecha fin
      this.simpleMeet.tools = this.formCita.controls.tools.value;
      this.simpleMeet.dateEnd = this.formCita.controls.dateEnd.value;
      this.simpleMeet.stimatedValue = 5.00;
      this.simpleMeet.status = 'hold';


      this.saveFormsimpleMeet(this.simpleMeet);
    }
  }
  saveFormsimpleMeet(container: Simplemeet) {
    this.simpleMeetService.saveCustomerService(container).subscribe(res => {
      if (res != null) this.messageService.add({ severity: 'success', detail: 'Registrado correctamente' });
      this.formCita.reset();
      this.chargeData(null);
    })
  }
  async getCatalogues() {
    await this.catalogueService.getCataloguebyCodeCat(PROVINCECAT).then(rest => {
      this.dropProvince = this.catalogueService.constructModel(rest);
    });
    await this.catalogueService.getCataloguebyCodeCat(SERVICETYPE).then(rest => {
      this.dropType = this.catalogueService.constructModel(rest);
    });

    this.catalogueService.getCataloguebyCodeCat(REQUESTSTATUSCAT).then(rest => {
      this.drop = this.catalogueService.constructModel(rest);
    })
  }
  onChangueProvince(event: any) {
    this.catalogueService.getCataloguebyCodeCatAndCodeFather(CITYCAT, PROVINCECAT, event.value).then(rest => {
      this.dropCity = this.catalogueService.constructModel(rest);
    });
  }

  //dialog
  showAssignation() {
    this.showEmployes = true;
  }
  showAssignated() {
    this.showEmployesAssigned = true;
    // this.getEmployeesAssigned();
  }
  getEmployees(event: LazyLoadEvent) {
    this.emplyeeservice.getEmployesToBesAssigned().subscribe(res => {
      res.forEach(item => {
        item.img = this.sharedFuntions.repair(item.img);
      })
      this.employesToAssig = res;
      this.sizeRecordsToAsig = res.length;
    })
  }
  getEmployeesAssigned() {
    this.emplyeeservice.getEmployessAssigned(this.selectedFather.seqsimplemeet, null).subscribe(res => {
      res.forEach(item => {
        item.img = this.sharedFuntions.repair(item.img);
      })
      this.employesAssigned = res;
      this.employesAssigned.length > 0 ? this.employeesAsignated = this.employesAssigned.length : 0;
      this.sizeRecordsAsigned = res.length;
    })
  }

  onRowSelect(event: any) {
    // this.getEmployeesAssigned();
    event.data.assigmentdayte = this.selectedFather.dateService;
    event.data.endassigmentdate = this.selectedFather.dateEnd;
    event.data.seqmeet = this.selectedFather.seqsimplemeet;
    this.selectdEmployes.push(event.data);
    console.log("this.selectdEmployes", this.selectdEmployes);
  }
  saveAssigment() {
    if (this.selectdEmployes.length > 0) {
      this.selectdEmployes.forEach(item => {
        this.emplyeeservice.updateEmployee(item).subscribe(update => {
          if (update) this.messageService.add({ severity: 'success', detail: 'Empleado asignado' })
          else this.messageService.add({ severity: 'error', detail: 'No se logro asignar' });
          this.getEmployeesAssigned();
          this.getEmployees(null);
          this.showEmployes = false;
        })
      })
    } else {
      this.messageService.add({ severity: 'error', detail: 'Seleccione al menos un empleado' });
    }

  }
  onRowSelectFather(event: Simplemeet) {
    this.selectedFather = event;
    // this.getEmployeesAssigned();
  }
  onRowSelectAssigned(event: Simplemeet) {
    this.selectedFather = event;
    this.getEmployeesAssigned();
  }

  fillDataToUpdate(item: Simplemeet) {
    console.log("this.item)", item);
    if (item.status != 'hold') {
      this.simpleMeetService.updateSimpleMeet(item).subscribe(rest => {
        if (rest) this.messageService.add({ severity: 'success', detail: 'Solicitud actualizada' });
        this.chargeData(null);
      });
    } else {
      this.messageService.add({ severity: 'error', detail: 'Seleccione un estado diferente a en espera' });
    }
  }
}

export class ServiceAdd {
  nameService: string;
  tipeService: string;
  constructor() {
    this.nameService = '';
    this.tipeService = ''
  }
}
