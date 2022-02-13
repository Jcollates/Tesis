import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { FuntionsSharedService } from 'src/app/sharedAll/serviceShared/funtions-shared.service';
import { CatProducts } from '../../shared/models/catproduct.model';
import { CatalogoProcutsService } from './catalogo-procuts.service';

@Component({
  selector: 'app-catalogo-products',
  templateUrl: './catalogo-products.component.html',
  styleUrls: ['./catalogo-products.component.css'],
  providers: [MessageService]
})
export class CatalogoProductsComponent implements OnInit {
  cols: any[];
  dataFromdb: CatProducts[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;

  catProducContainer: CatProducts = new CatProducts();

  formProduct: FormGroup = new FormGroup({});

  //IMG
  myfiles: any[] = [];
  fileUploades: any[] = [];
  newFile: NewFile = new NewFile();
  activeIndex1: number = 0;
  clonedProducts: { [s: string]: CatProducts; } = {};

  constructor(
    private catproService: CatalogoProcutsService,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer,
    private sharedFuntions: FuntionsSharedService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createCols();
    this.creteForm();
  }
  createCols() {
    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripción' },
      { field: 'precioventa', header: 'Precio venta' },
      { field: 'image', header: 'Imagen' },
      { field: '', header: 'Editar/Eliminar' },
    ];
  }
  chargeData(event: LazyLoadEvent) {
    this.catproService.getCatProducts().subscribe(rest => {
      rest.forEach( item => {
        item.img = this.sharedFuntions.repair(item.img);
      })
      this.dataFromdb = rest;
      this.sizeRecords = rest.length;
    });

  }

  async uploadFileNew(event) {
    if (event) {
      this.myfiles = []
      this.fileUploades = event.files;
      // console.log("fileUploades", this.fileUploades);
      const reader = new FileReader();
      this.newFile.type = event.files[0].type;
      this.newFile.name = event.files[0].name;
      reader.readAsDataURL(event.files[0]);
      reader.onload = () => {
        this.formProduct.patchValue({
          img: (reader.result as string)
        })
      }
      reader.onerror = (error) => {
        console.log(error);
      }
    }
  }
  creteForm() {
    this.formProduct = this.formBuilder.group({
      img: ['', Validators.required],
      codeProd: ['', Validators.required],
      name: ['', Validators.required],
      saleprize: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  validateForm() {
    this.formProduct.markAllAsTouched();
    if (!this.formProduct.valid) {
      this.messageService.add({severity:'error', detail: 'Formulario no valido'});
      console.log('FORM', this.formProduct.value);
    } else {
      console.log('FORM', this.formProduct.value);
      this.catProducContainer.codeproduct = this.formProduct.controls.codeProd.value;
      this.catProducContainer.img = this.formProduct.controls.img.value;
      this.catProducContainer.nameproduct = this.formProduct.controls.name.value;
      this.catProducContainer.saleprize = this.formProduct.controls.saleprize.value;
      this.catProducContainer.description = this.formProduct.controls.description.value;
      this.saveForm(this.catProducContainer);
    }
  }
 

  saveForm(container: CatProducts) {
    this.catproService.saveCatProducts(container).subscribe(res => {
      if(res != null) this.messageService.add({severity:'success', detail: 'Registrado correctamente'});
      this.formProduct.reset();
      this.fileUploades = [];
      this.activeIndex1 = 0;
      // console.log("SAVED?", res);
    })
  }
  async uploadFileEdit(event, datafrom: CatProducts) {
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
  onRowEditInit(customer: CatProducts) {
    this.clonedProducts[customer.seqcatproduct] = { ...customer };
  }
  onRowEditSave(customer: CatProducts) {
    this.catproService.updateCatProduct(customer).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Actualizado' });
        this.chargeData(null);
        delete this.clonedProducts[customer.seqcatproduct];
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al actualizar' });
      }
    });

  }
  onRowEditCancel(customer: CatProducts, index: number) {
    this.dataFromdb[index] = this.clonedProducts[customer.seqcatproduct];
    delete this.clonedProducts[customer.seqcatproduct];
  }
  deleteCustomerService(seqcustomer: any) {
    this.catproService.deleteCatProduct(seqcustomer).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Registro eliminado' });
        this.chargeData(null);
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al eliminar' });
      }
    })
  }


}

export class NewFile {
  type: string;
  data: string;
  name: string;
}
