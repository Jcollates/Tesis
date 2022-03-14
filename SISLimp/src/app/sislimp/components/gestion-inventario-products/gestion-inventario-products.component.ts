import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { ProductModel } from '../../shared/models/products.model';
import { Provider } from '../../shared/models/provider.model';
import { ProviderService } from '../gestion-provedores/provider.service';
import { ProductosService } from './productos.service';
import { FuntionsSharedService } from '../../../sharedAll/serviceShared/funtions-shared.service';

@Component({
  selector: 'app-gestion-inventario-products',
  templateUrl: './gestion-inventario-products.component.html',
  styleUrls: ['./gestion-inventario-products.component.css'],
  providers: [MessageService]
})
export class GestionInventarioProductsComponent implements OnInit {

  products: any[] = [];
  drop: SelectItem[] = [];
  fordropt: any
  //table
  cols: any[];
  dataFromdb: ProductModel[] = [];
  providers: Provider[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;

  formProducts: FormGroup = new FormGroup({});
  productContainer: ProductModel = new ProductModel();
  clonedProducts: { [s: string]: ProductModel; } = {};
  activeIndex1: number = 0;
  initialValues: any;
  constructor(
    private productService: ProductosService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private providerService: ProviderService,
    public sharedFunctions: FuntionsSharedService,
  ) {

  }

  ngOnInit(): void {
    this.createCols();
    this.createForm();
    this.createProviderCombo();
  }

  createCols() {
    this.cols = [
      { field: 'codepro', header: 'Código producto' },
      { field: 'cuantity', header: 'Cantidad' },
      { field: 'name', header: 'Nombre' },
      { field: 'saleprice', header: 'Precio venta' },
      { field: 'pricebought', header: 'Precio compra' },
      { field: 'datebuy', header: 'Fecha compra' },
      { field: 'provider', header: 'Poveedor' },
      { field: 'description', header: 'Detalle' },
      { field: '', header: 'Editar/Eliminar' },

    ];
  }

  createForm() {
    this.formProducts = this.formBuilder.group({
      quantity: ['', Validators.required],
      codeprod: ['', Validators.required],
      nameprod: ['', Validators.required],
      pricebougth: ['', Validators.required],
      saleprice: ['', Validators.required],
      datebought: ['', Validators.required],
      provider: ['', Validators.required],
      description: ['', Validators.required]
    }, {validator: this.sharedFunctions.validateProductByCode('codeprod')});
    this.initialValues = this.formProducts.value;
  }

  chargeData(event: LazyLoadEvent) {
    this.productService.getProducts().subscribe(rest => {
      if (rest.length > 0) {
        console.log(rest);
        this.dataFromdb = rest;
        this.sizeRecords = rest.length;
        this.dataFromdb.forEach(item => item.datebought = new Date(item.datebought))
      }
    });
  }


  validateForm() {
    this.formProducts.markAllAsTouched();
    if (!this.formProducts.valid) {
      this.messageService.add({ severity: 'error', detail: 'Formulario no valido' });
      console.log(this.formProducts.value)
    } else {
      console.log('FORM', this.formProducts.value);
      this.productContainer.codeproduct = this.formProducts.controls.codeprod.value;
      this.productContainer.name = this.formProducts.controls.nameprod.value;
      this.productContainer.description = this.formProducts.controls.description.value;
      this.productContainer.quantity = this.formProducts.controls.quantity.value;
      this.productContainer.pricebought = this.formProducts.controls.pricebougth.value;
      this.productContainer.saleprice = this.formProducts.controls.saleprice.value;
      this.productContainer.datebought = this.formProducts.controls.datebought.value;
      this.productContainer.provider_seq = this.formProducts.controls.provider.value;

      this.saveForm(this.productContainer);
    }
  }

  saveForm(container: ProductModel) {
    this.productService.saveProducts(container).subscribe(res => {
      if (res != null) {
        this.messageService.add({ severity: 'success', detail: 'Registrado correctamente' });
        this.formProducts.reset(this.initialValues);
        this.chargeData(null);
        this.activeIndex1 = 0;
        this.createProviderCombo();
      }
    })
  }
  createProviderCombo() {
    this.providerService.getProviders().then(rest => {
      this.providers = rest;
      this.drop = this.crateCombo(rest);
    });
  }
  crateCombo(list: Provider[]): SelectItem[] {
    const comboItems: SelectItem[] = [];
    comboItems.push({ label: 'Seleccione', value: '' });
    return comboItems.concat(list.map(value => ({
      label: value.namenterprice + ' - ' + value.seqprovider,
      value: value.seqprovider.toString()
    })));
  }
  onRowEditInit(customer: ProductModel) {
    this.clonedProducts[customer.seqprod] = { ...customer };
  }

  onRowEditSave(customer: ProductModel) {
    console.log(customer)
    this.productService.updateProducts(customer).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Actualizado' });
        this.chargeData(null);
        delete this.clonedProducts[customer.seqprod];
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al actualizar' });
      }
    });

  }
  onRowEditCancel(customer: ProductModel, index: number) {
    this.dataFromdb[index] = this.clonedProducts[customer.seqprod];
    delete this.clonedProducts[customer.seqprod];
  }
  deleteCustomerService(seqcustomer: any) {
    this.productService.deleteProducts(seqcustomer).subscribe(rest => {
      if (rest) {
        this.messageService.add({ severity: 'success', detail: 'Registro eliminado' });
        this.chargeData(null);
      }
    })
  }
  cancelForm(){
    this.formProducts.reset(this.initialValues);
    this.chargeData(null);
    this.activeIndex1 = 0;
  }
}
