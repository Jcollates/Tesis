import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { FuntionsSharedService } from 'src/app/sharedAll/serviceShared/funtions-shared.service';
import { Employee } from '../../shared/models/employee.model';
import { NewFile } from '../catalogo-products/catalogo-products.component';
import { EmployeeService } from './employee.service';
const CODECAT = 'CHARGECAT';
@Component({
  selector: 'app-gestion-empleados',
  templateUrl: './gestion-empleados.component.html',
  styleUrls: ['./gestion-empleados.component.css'],
  providers: [MessageService]
})
export class GestionEmpleadosComponent implements OnInit {

  cols: any[];
  dataFromdb: any[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;
  drop: any[] = [];
  fordropt: any
  //Form
  formEmployee: FormGroup = new FormGroup({});
  employeContainer: Employee = new Employee();
  //img
  myfiles: any[] = [];
  fileUploades: any[] = [];
  newFile: NewFile = new NewFile();


  //edit 
  activeIndex1: number = 0;
  clonedProducts: { [s: string]: Employee; } = {};

  constructor(
    private formBuilder: FormBuilder,
    public sharedFuntions: FuntionsSharedService,
    private messageService: MessageService,
    private catalogueService: CataloguesService,
    private employeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.createCols();
    this.createForm();
    this.getCatalogues()
  }
  createCols() {
    this.cols = [
      { field: 'cedula', header: 'Cedula' },
      { field: 'name', header: 'Nombre' },
      { field: 'lastname', header: 'Apellido' },
      { field: 'birthday', header: 'Fecha nacimiento' },
      { field: 'contractday', header: 'Fecha contratación' },
      { field: 'charge', header: 'Cargo' },
      { field: 'image', header: 'Imagen' },
      { field: '', header: 'Editar/Eliminar' },
    ];
  }
  chargeData(event: LazyLoadEvent) {
    this.employeService.getEmployess().subscribe(rest => {
      console.log(rest);
      rest.forEach(item => {
        item.img = this.sharedFuntions.repair(item.img);
        item.birthday = new Date(item.birthday);
        item.contractday = new Date(item.contractday);
      })
      this.dataFromdb = rest;
      this.sizeRecords = rest.length;
    });
  }
  getCatalogues() {
    this.catalogueService.getCataloguebyCodeCat(CODECAT).then(rest => {
      this.drop = this.catalogueService.constructModel(rest);
    })
  }
  createForm() {
    this.formEmployee = this.formBuilder.group({
      dni: ['', Validators.required],
      img: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      charge: ['', Validators.required],
      contractday: ['', Validators.required],
    });
  }

  validateForm() {
    this.formEmployee.markAllAsTouched();
    if (!this.formEmployee.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario no valido' });
    } else {
      this.employeContainer.dni = this.formEmployee.controls.dni.value;
      this.employeContainer.img = this.formEmployee.controls.img.value;
      this.employeContainer.name = this.formEmployee.controls.name.value;
      this.employeContainer.lastname = this.formEmployee.controls.lastname.value;
      this.employeContainer.position = this.formEmployee.controls.charge.value;
      this.employeContainer.birthday = this.formEmployee.controls.birthday.value;
      this.employeContainer.contractday = this.formEmployee.controls.contractday.value;
      this.saveForm(this.employeContainer);
    }
  }
  async uploadFileNew(event) {
    if (event) {
      this.myfiles = []
      this.fileUploades = event.files;
      const reader = new FileReader();
      this.newFile.type = event.files[0].type;
      this.newFile.name = event.files[0].name;
      reader.readAsDataURL(event.files[0]);
      reader.onload = () => {
        this.formEmployee.patchValue({
          img: (reader.result as string)
        })
      }
      reader.onerror = (error) => {
        console.log(error);
      }
    }
  }
  async uploadFileEdit(event, dataFrom: Employee) {
    if (event) {
      this.myfiles = []
      this.fileUploades = event.files;
      const reader = new FileReader();
      this.newFile.type = event.files[0].type;
      this.newFile.name = event.files[0].name;
      reader.readAsDataURL(event.files[0]);
      reader.onload = () => {
        dataFrom.img = (reader.result as string);
      }
      reader.onerror = (error) => {
        console.log(error);
      }
    }
  }



  saveForm(container: Employee) {
    this.employeService.saveEmployee(container).subscribe(res => {
      if (res != null) this.messageService.add({ severity: 'success', detail: 'Registrado correctamente' });
      this.formEmployee.reset();
      this.fileUploades = [];
      this.chargeData(null);
      this.activeIndex1 = 0;
      // console.log("SAVED?", res);
    })
  }

  onRowEditInit(customer: Employee) {
    this.clonedProducts[customer.seqemploy] = { ...customer };
  }
  onRowEditSave(customer: Employee) {
    this.employeService.updateEmployee(customer).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Actualizado' });
        this.chargeData(null);
        delete this.clonedProducts[customer.seqemploy];
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al actualizar' });
      }
    });

  }
  onRowEditCancel(customer: Employee, index: number) {
    this.dataFromdb[index] = this.clonedProducts[customer.seqemploy];
    delete this.clonedProducts[customer.seqemploy];
  }
  deleteCustomerService(seqcustomer: any) {
    this.employeService.deleteEmployee(seqcustomer).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Registro eliminado' });
        this.chargeData(null);
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al eliminar' });
      }
    })
  }

}
