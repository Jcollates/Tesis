import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { FuntionsSharedService } from 'src/app/sharedAll/serviceShared/funtions-shared.service';
import { Simplemeet } from '../../shared/models/simplemeet.model';
import { AgreementService } from '../gestion-contratos/agreement.service';
import { EmployeeService } from '../gestion-empleados/employee.service';
import { SimpleMeetService } from './simple-meet.service';
const CITYCAT = 'CITYCAT';
const PROVINCECAT = 'PROVINCECAT';
const SERVICETYPE = 'SERVICETYPE';
@Component({
  selector: 'app-agendamiento-citas',
  templateUrl: './agendamiento-citas.component.html',
  styleUrls: ['./agendamiento-citas.component.css'],
  providers: [MessageService]
})
export class AgendamientoCitasComponent implements OnInit {

  cars: any[] = [];
  products: any[] = [];
  drop: SelectItem[] = [];
  fordropt: any
  dropCity: SelectItem[] = [];
  dropProvince: SelectItem[] = [];
  dropType: SelectItem[] = [];
  
  //table
  cols: any[];
  dataFromdb: Simplemeet[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;

  //employees
  colsEmployees: any[] = [];
  employesToAssig: any[] = [];
  showEmployes: boolean = false;

  //fomrs

  formCita: FormGroup = new FormGroup({});
  simpleMeet: Simplemeet = new Simplemeet();
  constructor(
    private simpleMeetService: SimpleMeetService,
    private formBuilder: FormBuilder,
    private catalogueService: CataloguesService,
    private messageService: MessageService,
    private agreeService: AgreementService,
    private emplyeeservice: EmployeeService,
    private sharedFuntions: FuntionsSharedService,
  ) { }
  ngOnInit(): void {
    this.products = [
      { code: 1, name: 'NAME', category: 'TESTING', quantity: 1000 },
      { code: 1, name: 'NAME', category: 'TESTING', quantity: 1000 },
      { code: 1, name: 'NAME', category: 'TESTING', quantity: 1000 },
    ];
    this.createCols();
    this.createForm();
    this.getCatalogues();
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
    this.simpleMeetService.getSimpleMeets().subscribe(rest => this.dataFromdb = rest );
  }
  showAssignation(){
    this.showEmployes = true;
    this.employesToAssig = [
      {nameEmploye: 'Empleado 1', charge: 'Limpiador'},
      {nameEmploye: 'Empleado 2 ', charge: 'Piscinero'},
      {nameEmploye: 'Empleado 3', charge: 'Carpintero'},
      
    ]
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
    });
  }
  validateForm(){
    
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
      this.saveFormsimpleMeet(this.simpleMeet);
    }
  }
  saveFormsimpleMeet(container: Simplemeet) {
    this.simpleMeetService.saveCustomerService(container).subscribe(res => {
      if(res != null) this.messageService.add({severity:'success', detail: 'Registrado correctamente'});
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
  }
  onChangueProvince(event: any) {
    this.catalogueService.getCataloguebyCodeCatAndCodeFather(CITYCAT, PROVINCECAT, event.value).then(rest => {
      this.dropCity = this.catalogueService.constructModel(rest);
    });
  }
}
