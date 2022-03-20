import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { FuntionsSharedService } from 'src/app/sharedAll/serviceShared/funtions-shared.service';
import { CatServices } from '../../shared/models/catservices.model';
import { NewFile } from '../catalogo-products/catalogo-products.component';
import { CatServiceService } from './cat-service.service';

const CODECAT = 'SERVICETYPE';
@Component({
  selector: 'app-catalogo-services',
  templateUrl: './catalogo-services.component.html',
  styleUrls: ['./catalogo-services.component.css'],
  providers: [MessageService]
})
export class CatalogoServicesComponent implements OnInit {
  cols: any[];
  dataFromdb: any[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;
  drop: SelectItem[] = [];
  combo: SelectItem[] = [];
  fordropt: any;
  formService: FormGroup = new FormGroup({});
  catServiceContainer: CatServices = new CatServices();

  //upload
  myfiles: any[] = [];
  fileUploades: any[] = [];
  newFile: NewFile = new NewFile();

  //edit table 
  activeIndex1: number = 0;
  clonedProducts: { [s: string]: CatServices; } = {};
  initialState: any;
  constructor(
    private catalogueService: CataloguesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private catService: CatServiceService,
    public sharedFuntions: FuntionsSharedService,
  ) { }

  ngOnInit(): void {
    this.createCols();
    this.getCatalogues();
    this.createForm();
  }
  createCols() {
    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'type', header: 'Tipo' },
      { field: 'name', header: 'Nombre' },
      { field: 'pricemeter', header: 'Precio por metro' },
      { field: 'pricehour', header: 'Precio por hora' },
      { field: 'description', header: 'Descripción' },
      { field: 'image', header: 'Imagen' },
      { field: '', header: 'Editar/Eliminar' },

    ];
  }
  chargeData(event: LazyLoadEvent) {
    this.catService.getCatServices().subscribe(rest => {
      rest.forEach(item => {
        item.img = this.sharedFuntions.repair(item.img);
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
    this.formService = this.formBuilder.group({
      img: ['', Validators.required],
      codeService: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      hourprice: ['', Validators.required],
      meterprice: ['', Validators.required],
      description: ['', Validators.required]
    }, {validator: this.sharedFuntions.validateCatService('codeService')});
    this.initialState = this.formService.value;
  }

  validateForm() {
    this.formService.markAllAsTouched();
    if (!this.formService.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario no valido' });
      
    } else {
      this.catServiceContainer.codeservice = this.formService.controls.codeService.value;
      this.catServiceContainer.img = this.formService.controls.img.value;
      this.catServiceContainer.nameservice = this.formService.controls.name.value;
      this.catServiceContainer.meterprize = this.formService.controls.meterprice.value;
      this.catServiceContainer.hourprize = this.formService.controls.hourprice.value;
      this.catServiceContainer.type = this.formService.controls.type.value;
      this.catServiceContainer.description = this.formService.controls.description.value;
      this.saveForm(this.catServiceContainer);
    }
  }

  //upload
  async uploadFileNew(event) {
    if (event) {
      this.myfiles = []
      this.fileUploades = event.files;
      const reader = new FileReader();
      this.newFile.type = event.files[0].type;
      this.newFile.name = event.files[0].name;
      reader.readAsDataURL(event.files[0]);
      reader.onload = () => {
        this.formService.patchValue({
          img: (reader.result as string)
        })
      }
      reader.onerror = (error) => {
        console.log(error);
      }
    }
  }
  async uploadFileEdit(event, datafrom: CatServices) {
    if (event) {
      this.myfiles = []
      this.fileUploades = event.files;
      const reader = new FileReader();
      this.newFile.type = event.files[0].type;
      this.newFile.name = event.files[0].name;
      reader.readAsDataURL(event.files[0]);
      reader.onload = () => {
        datafrom.img = (reader.result as string);
      }
      reader.onerror = (error) => {
        console.log(error);
      }
    }
  }
  saveForm(container: CatServices) {
    this.catService.saveServicesCat(container).subscribe(res => {
      if (res != null) {
        this.messageService.add({ severity: 'success', detail: 'Registrado correctamente' });
        this.formService.reset(this.initialState);
        this.fileUploades = [];
        this.activeIndex1 = 0;
        this.chargeData(null);
      };

    })
  }
  onRowEditInit(customer: CatServices) {
    this.clonedProducts[customer.seqcatservice] = { ...customer };
  }
  onRowEditSave(customer: CatServices) {
    this.catService.updateServiceCat(customer).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Actualizado' });
        this.chargeData(null);
        delete this.clonedProducts[customer.seqcatservice];
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al actualizar' });
      }
    });

  }
  onRowEditCancel(customer: CatServices, index: number) {
    this.dataFromdb[index] = this.clonedProducts[customer.seqcatservice];
    delete this.clonedProducts[customer.seqcatservice];
  }
  deleteCustomerService(seqcustomer: any) {
    this.catService.deleteServicesCat(seqcustomer).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Registro eliminado' });
        this.chargeData(null);
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al eliminar' });
      }
    })
  }
  cancelForm(){
    this.formService.reset(this.initialState);
    this.fileUploades = [];
    this.chargeData(null);
    this.activeIndex1 = 0;
  }


}
