import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { Agreement } from '../../shared/models/agreements.model';
import { AgreementService } from './agreement.service';
const CODECAT = 'SERVICETYPE'
@Component({
  selector: 'app-gestion-contratos',
  templateUrl: './gestion-contratos.component.html',
  styleUrls: ['./gestion-contratos.component.css'],
  providers: [MessageService]
})
export class GestionContratosComponent implements OnInit {

  drop: SelectItem[] = [];
  fordropt: any

  //table
  cols: any[];
  dataFromdb: Agreement[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;

  //employees
  colsEmployees: any[] = [];
  employesToAssig: any[] = [];
  showEmployesAssigned: boolean = false;
  showEmployes: boolean = false;
  showLegalperson: boolean = false;

  formcontracts: FormGroup = new FormGroup({});
  agreementContainer: Agreement = new Agreement();
  seqLegalperson: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private catalogueService: CataloguesService,
    private messageService: MessageService,
    private agreeService: AgreementService
  ) { }
  ngOnInit(): void {
    this.createCols();
    this.createForm();
    this.getCatalogues();
  }

  createCols() {
    this.cols = [
      { field: 'codeContract', header: 'Código contrato' },
      { field: 'datestart', header: 'Fecha inicio' },
      { field: 'dateend', header: 'Fecha fin' },
      { field: 'nameEnterprice', header: 'Nombre empresa' },
      { field: 'respresent', header: 'Responsable empresa' },
      { field: 'typeservice', header: 'Tipo servicio' },
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

  showAssignation() {
    this.showEmployes = true;
    this.employesToAssig = [
      { nameEmploye: 'Empleado 1', charge: 'Limpiador' },
      { nameEmploye: 'Empleado 2 ', charge: 'Piscinero' },
      { nameEmploye: 'Empleado 3', charge: 'Carpintero' },
    ]
  }
  showAssignated() {
    this.showEmployesAssigned = true;
    this.employesToAssig = [
      { nameEmploye: 'Empleado 1', charge: 'Limpiador' },
      { nameEmploye: 'Empleado 2 ', charge: 'Piscinero' },
      { nameEmploye: 'Empleado 3', charge: 'Carpintero' },
    ]
  }

  showLegal() {
    this.showLegalperson = true;
  }
  getLegal(event) {
    this.seqLegalperson = event.seqlegalperson;
    this.formcontracts.patchValue({
      legalperson: event.name + " " + event.lastname
    });
  }
  validateForm() {
    if (!this.formcontracts.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario no valido' });
      // console.log('FORM', this.formService.value);
    } else {
      console.log('FORM', this.formcontracts.value);
      this.agreementContainer.ruc = this.formcontracts.controls.ruc.value;
      this.agreementContainer.name = this.formcontracts.controls.name.value;
      this.agreementContainer.location = this.formcontracts.controls.serviceAddress.value;
      this.agreementContainer.principallocation = this.formcontracts.controls.principaladdress.value;
      this.agreementContainer.phone = this.formcontracts.controls.phone.value;
      this.agreementContainer.type = this.formcontracts.controls.type.value;
      this.agreementContainer.datestart = this.formcontracts.controls.stardate.value;
      this.agreementContainer.dateend = this.formcontracts.controls.endate.value;
      this.agreementContainer.schedule = this.formcontracts.controls.schedule.value;
      this.agreementContainer.servicedetail = this.formcontracts.controls.detailService.value;
      this.agreementContainer.subtotal = this.formcontracts.controls.subtotal.value;
      this.agreementContainer.area = this.formcontracts.controls.workarea.value;
      this.agreementContainer.loginuser_codeuser = this.seqLegalperson;
      this.saveForm(this.agreementContainer);
    }
  }
  chargeData(event: LazyLoadEvent) {
    this.agreeService.getAgreements().subscribe(rest => {
      console.log(rest);
      this.dataFromdb = rest;
      this.sizeRecords = rest.length;
    });
  }

  createForm() {
    this.formcontracts = this.formBuilder.group({
      ruc: ['', Validators.required],
      name: ['', Validators.required],
      legalperson: [{ value: '', disabled: true }, [Validators.required]],
      principaladdress: ['', Validators.required],
      serviceAddress: ['', Validators.required],
      phone: ['', Validators.required],
      workarea: ['', Validators.required],
      type: ['', Validators.required],
      stardate: ['', Validators.required],
      endate: ['', Validators.required],
      subtotal: ['', Validators.required],
      schedule: ['', Validators.required],
      detailService: ['', Validators.required],
    });
  }

  getCatalogues() {
    this.catalogueService.getCataloguebyCodeCat(CODECAT).then(rest => {
      this.drop = this.catalogueService.constructModel(rest);
    })
  }

  saveForm(container: Agreement) {
    if (container.loginuser_codeuser > 0) {
      this.agreeService.saveAgreement(container).subscribe(res => {
        if (res != null) {
          this.messageService.add({ severity: 'success', detail: 'Registrado correctamente' });
          this.formcontracts.reset();
          // console.log("SAVED?", res);
          this.seqLegalperson = 0;
          this.chargeData(null);
        }
      });
    }
  }
}
