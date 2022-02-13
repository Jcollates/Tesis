import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { FuntionsSharedService } from 'src/app/sharedAll/serviceShared/funtions-shared.service';
import { CustomerServiceModel } from '../../shared/models/customerservice.model';
import { Employee } from '../../shared/models/employee.model';
import { EmployeeService } from '../gestion-empleados/employee.service';
import { CustomerService } from './customer.service';
const CODECAT = 'SERVICETYPE';
const PROVINCECAT = 'PROVINCECAT';
const CITYCAT = 'CITYCAT';
@Component({
  selector: 'app-atencion-cliente',
  templateUrl: './atencion-cliente.component.html',
  styleUrls: ['./atencion-cliente.component.css'],
  providers: [MessageService]
})
export class AtencionClienteComponent implements OnInit {
  activeIndex1: number = 0;
  dropCity: SelectItem[] = [];
  dropProvince: SelectItem[] = [];
  dropType: SelectItem[] = [];
  products: any[] = [];
  drop: any[] = [];
  fordropt: any
  //table
  cols: any[];
  dataFromdb: CustomerServiceModel[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;
  formCustomer: FormGroup = new FormGroup({});
  results: Employee[] = [];

  customerContainer: CustomerServiceModel = new CustomerServiceModel();
  clonedProducts: { [s: string]: CustomerServiceModel; } = {};
  constructor(
    private customerService: CustomerService,
    private catalogueService: CataloguesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private employeService: EmployeeService,
    public sharedFuntions: FuntionsSharedService
  ) { }

  ngOnInit(): void {
    this.createCols();
    this.getCatalogues();
    this.createForm();
  }

  createCols() {
    this.cols = [
      { field: 'codeCli', header: 'Codigo cliente' },
      { field: 'date', header: 'Fecha de observación' },
      { field: 'name', header: 'Nombre' },
      { field: 'lastname', header: 'Apellido' },
      { field: 'observation', header: 'Observaciones' },
      { field: 'phone', header: 'Num. Telefono' },
      { field: 'addres', header: 'Dirección' },
      { field: 'employe', header: 'Nombre empleado' },
      { field: 'detailservice', header: 'Detalle del servicio ' },
      { field: '', header: 'Editar/Eliminar' }
    ];
  }
  chargeData(event: LazyLoadEvent) {
    this.customerService.getCustomerService().subscribe(rest => {
      if (rest.length > 0) {
        rest.forEach(item => item.dateobservation = new Date(item.dateobservation));
        this.dataFromdb = rest;
        this.sizeRecords = rest.length;
        console.log(rest);
      }

    });
  }
  createForm() {
    this.formCustomer = this.formBuilder.group({
      dni: ['', Validators.required],
      email: ['', Validators.required],
      cliname: ['', Validators.required],
      clilastname: ['', Validators.required],
      phone: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      observation: ['', Validators.required],
      typeservice: ['', Validators.required],
      employename: ['', Validators.required],
      employecode: ['', Validators.required],
      servicedate: ['', Validators.required],
      serviceDetail: ['', Validators.required],
      address: ['', Validators.required],

    }, {validator: this.sharedFuntions.emailValidator('email')});
    
  }
  async getCatalogues() {
    this.catalogueService.getCataloguebyCodeCat(CODECAT).then(rest => {
      this.dropType = this.catalogueService.constructModel(rest);
    });
    await this.catalogueService.getCataloguebyCodeCat(PROVINCECAT).then(rest => {
      this.dropProvince = this.catalogueService.constructModel(rest);
    });
  }

  validateForm() {
    this.formCustomer.markAllAsTouched()
    if (!this.formCustomer.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario no valido' });
      console.log('FORM', this.formCustomer.value);

    } else {
      console.log('FORM', this.formCustomer.value);
      this.customerContainer.dnicliente = this.formCustomer.controls.dni.value;
      this.customerContainer.email = this.formCustomer.controls.email.value;
      this.customerContainer.nameclient = this.formCustomer.controls.cliname.value;
      this.customerContainer.lastnameclient = this.formCustomer.controls.clilastname.value;
      this.customerContainer.phonenumber = this.formCustomer.controls.phone.value;
      this.customerContainer.province = this.formCustomer.controls.province.value;
      this.customerContainer.city = this.formCustomer.controls.city.value;

      this.customerContainer.observation = this.formCustomer.controls.observation.value;
      this.customerContainer.servicetype = this.formCustomer.controls.typeservice.value;
      this.customerContainer.employeename = this.formCustomer.controls.employename.value.name;
      this.customerContainer.codeemployee = this.formCustomer.controls.employecode.value;
      this.customerContainer.servicedate = this.formCustomer.controls.servicedate.value;

      this.saveForm(this.customerContainer);
    }
  }

  saveForm(container: CustomerServiceModel) {
    // console.log('cotainer', container);
    this.customerService.saveCustomerService(container).subscribe(res => {
      if (res != null) {
        this.messageService.add({ severity: 'success', detail: 'Registrado correctamente' });
        this.formCustomer.reset();
        this.chargeData(null);
        this.activeIndex1 = 0;
      }
    })
  }
  onChangueProvince(event: any) {
    console.log(event.value)
    this.catalogueService.getCataloguebyCodeCatAndCodeFather(CITYCAT, PROVINCECAT, event.value).then(rest => {
      this.dropCity = this.catalogueService.constructModel(rest);
    })
  }
  searchEmploy(event: any) {
    this.employeService.getEmployesByName(event.query).subscribe(items => {
      items.forEach(item => item.img = this.sharedFuntions.repair(item.img))
      this.results = items
    })
  }
  watchIt(event: Employee) {
    this.formCustomer.patchValue({ employecode: event.seqemploy });
  }
  onRowEditInit(customer: CustomerServiceModel) {
    this.clonedProducts[customer.seqcustomer] = { ...customer };
  }

  onRowEditSave(customer: CustomerServiceModel) {
    console.log(customer)
    this.customerService.saveCustomerService(customer).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Actualizado' });
        this.chargeData(null);
        delete this.clonedProducts[customer.seqcustomer];
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al actualizar' });
      }
    });

  }
  onRowEditCancel(customer: CustomerServiceModel, index: number) {
    this.dataFromdb[index] = this.clonedProducts[customer.seqcustomer];
    delete this.clonedProducts[customer.seqcustomer];
  }
  deleteCustomerService(seqcustomer: any){
    this.customerService.deleteCustomer(seqcustomer).subscribe(rest => {
      if(rest ){
        this.messageService.add({ severity: 'success', detail: 'Registro eliminado' }); 
        this.chargeData(null);
      }
    })
  }

}
