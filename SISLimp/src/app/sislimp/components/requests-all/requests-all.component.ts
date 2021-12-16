import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { PoductsQuantity, ProductEquleton } from 'src/app/page/components/products/products.component';
import { SolProduct } from 'src/app/page/components/sharedpage/models/solproduct.model';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { FuntionsSharedService } from 'src/app/sharedAll/serviceShared/funtions-shared.service';
import { Agreement } from '../../shared/models/agreements.model';
import { CatProducts } from '../../shared/models/catproduct.model';
import { Employee } from '../../shared/models/employee.model';
import { AgreementService } from '../gestion-contratos/agreement.service';
import { EmployeeService } from '../gestion-empleados/employee.service';
import { ProductosService } from '../gestion-inventario-products/productos.service';
import { RequestsService } from './requests.service';
const REQUESTSTATUSCAT = 'REQUESTSTATUSCAT'
@Component({
  selector: 'app-requests-all',
  templateUrl: './requests-all.component.html',
  styleUrls: ['./requests-all.component.css'],
  providers: [MessageService]
})
export class RequestsAllComponent implements OnInit {

  drop: SelectItem[] = [];
  fordropt: any

  //table
  cols: any[];
  colWatch: any[];
  dataFromdb: SolProduct[] = [];
  dataFromdbWatch: SolProduct[] = [];
  sizeRecords: number = 50;
  sizeRecordsToAsig: number = 10;
  sizeRecordsAsigned: number = 10;
  pageSize: number = 50;
  pureProducts: CatProducts[] = [];
  itemToSend: SolProduct = new SolProduct();
  statusSol: any;
  selectedProduct: any;
  selectedSoli: any;

  selectedFather: Agreement = new Agreement();
  employeesAsignated: number = 0

  //employees
  colsProducts: any[] = [];
  employesToAssig: Employee[] = [];
  employesAssigned: Employee[] = [];
  showEmployesAssigned: boolean = false;
  showEmployes: boolean = false;
  showLegalperson: boolean = false;
  selectdProducts: ProductEquleton[] = [];
  formcontracts: FormGroup = new FormGroup({});
  agreementContainer: Agreement = new Agreement();
  seqLegalperson: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private catalogueService: CataloguesService,
    private messageService: MessageService,
    private agreeService: AgreementService,
    private emplyeeservice: EmployeeService,
    private sharedFuntions: FuntionsSharedService,
    private requetsService: RequestsService,
    private authService: AuthService,
    private productsService: ProductosService
  ) { }
  ngOnInit(): void {
    this.createCols();
    this.getCatalogues();
  }

  createCols() {
    this.cols = [
      { field: 'nameuser', header: 'Usuario' },
      { field: 'conactnumber', header: 'Número de contacto' },
      { field: 'email', header: 'Correo electrónico' },
      { field: 'dateCreate', header: 'Fecha solicitud' },
      { field: 'status', header: 'Estado' },
      { field: '', header: 'Cambiar estado' },
      { field: '', header: 'Guardar' },
    ]
    this.colsProducts = [
      { field: 'codeproduct', header: 'Código producto' },
      { field: 'name', header: 'Nombre' },
      { field: 'quantity', header: 'Cantidad' },
      { field: 'saleprice', header: 'PVP' },
    ]
    this.colWatch = [
      { field: 'nameuser', header: 'Usuario' },
      { field: 'conactnumber', header: 'Número de contacto' },
      { field: 'email', header: 'Correo electrónico' },
      { field: 'dateCreate', header: 'Fecha solicitud' },
      { field: 'status', header: 'Estado' }
    ]
  }
  // chargeData(event: LazyLoadEvent) {
  //   this.requetsService.getAllSolProducts().subscribe(rest => {
  //     console.log("1", rest.filter(item =>item.status == 'process'));
  //     console.log("2", rest.filter(item =>item.status != 'process'));
      
  //     this.sizeRecords = rest.length;
  //   });
  // }

  getCatalogues() {
    this.catalogueService.getCataloguebyCodeCat(REQUESTSTATUSCAT).then(rest => {
      this.drop = this.catalogueService.constructModel(rest);
    })
  }

  saveForm(container: Agreement) {

  }

  onRowSelect(event: any) {
    event.data.assigmentdayte = this.selectedFather.datestart;
    this.selectdProducts.push(event.data);
    console.log("this.selectdProducts", this.selectdProducts);
  }
  saveConfirmation(father: SolProduct, items: any) {
    father.products = JSON.stringify(items);
  }
  onRowSelectFather(event: any) {
    this.selectedFather = event;
  }
  transformFromJSON(value: string) {
    return JSON.parse(value);
  }

  fillDataToUpdate(item: SolProduct) {
    console.log("this.item)", item);
    if(item.status != 'process'){
      this.requetsService.updateSolicitud(item).subscribe(rest => {
        if(rest) this.messageService.add({ severity: 'success', detail: 'Solicitud actualizada' });
        this.getSolProducts(null);
      });
    } else {
      this.messageService.add({ severity: 'error', detail: 'Seleccione un estado' });
    }
  }
  //para llenar
  async getProductsRelated(products: PoductsQuantity[]) {
    let prods = [];
    let seen = new Set();
    const filtered = products.filter(item => {
      const duplicate = seen.has(item.codeProd);
      seen.add(item.codeProd);
      return !duplicate;
    });
    for (let item of filtered) {
      await this.productsService.getEspecifict(item.codeProd).then(rest => {
        prods.push(rest);
      });
    }
    return prods;
  }
  async getSolProducts(event: LazyLoadEvent) {
    this.requetsService.getAllSolProducts().subscribe(rest => {
      rest.forEach(async item => {
        let productsQuantity: PoductsQuantity[] = [];
        productsQuantity = [...productsQuantity, ...this.transformFromJSON(item.products)];
        item.elementAsArray = await this.getProductsRelated(productsQuantity);
      });
      // this.dataFromdb = rest;
      this.dataFromdb = rest.filter(item =>item.status == 'process');
      this.dataFromdbWatch = rest.filter(item =>item.status != 'process');
      console.log("VEAMOS ", rest);
    });
  }
  

}
