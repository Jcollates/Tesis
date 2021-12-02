import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { ProductModel } from '../../shared/models/products.model';
import { Provider } from '../../shared/models/provider.model';
import { ProviderService } from '../gestion-provedores/provider.service';
import { ProductosService } from './productos.service';

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

  constructor(
    private productService: ProductosService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private prodivderService: ProviderService
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
      { field: 'datebuy', header: 'Fecha compra' },
      { field: 'provider', header: 'Poveedor' }
    ];
  }

  createForm(){
    this.formProducts = this.formBuilder.group({
      quantity: ['', Validators.required],
      codeprod: ['', Validators.required],
      nameprod: ['', Validators.required],
      pricebougth: ['', Validators.required],
      saleprice: ['', Validators.required],
      datebought: ['', Validators.required],
      provider: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  chargeData(event: LazyLoadEvent) {
    this.productService.getProducts().subscribe(rest => {
      console.log(rest);
      this.dataFromdb = rest;
      this.sizeRecords = rest.length;
    });
  }

  validateForm() {
    if (!this.formProducts.valid) {
      this.messageService.add({severity:'error', detail: 'Formulario no valido'});
      // console.log('FORM', this.formService.value);
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
    // console.log('cotainer', container);
    this.productService.saveProducts(container).subscribe(res => {
      if(res != null) this.messageService.add({severity:'success', detail: 'Registrado correctamente'});
      this.formProducts.reset();
      this.chargeData(null);
      // console.log("SAVED?", res);
    })
  }
  createProviderCombo(){
    this.prodivderService.getProviders().subscribe(rest => {
      // console.log('providers',rest);
      this.providers = rest;
      this.drop = this.crateCombo(rest);
    });
  }
  crateCombo(list: Provider[]): SelectItem[] {
    const comboItems: SelectItem[] = [];
    comboItems.push({ label: 'Seleccione', value: null });
    return comboItems.concat(list.map(value => ({
      label: value.namenterprice + ' - ' + value.seqprovider,
      value: value.seqprovider.toString()
    })));
  }
}
