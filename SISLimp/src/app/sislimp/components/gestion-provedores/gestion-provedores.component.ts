import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { Provider } from '../../shared/models/provider.model';
import { ProviderService } from './provider.service';
const CITYCAT = 'CITYCAT';
const PROVINCECAT = 'PROVINCECAT';
const PAYCAT = 'TYPEPAYPROVIDERCAT';
@Component({
  selector: 'app-gestion-provedores',
  templateUrl: './gestion-provedores.component.html',
  styleUrls: ['./gestion-provedores.component.css'],
  providers: [MessageService]
})
export class GestionProvedoresComponent implements OnInit {
  products: any[] = [];
  dropCity: SelectItem[] = [];
  dropProvince: SelectItem[] = [];
  dropPay: SelectItem[] = [];
  fordropt: any
  //table
  cols: any[];
  dataFromdb: Provider[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;

  codeProvince: string;
  providerContainer: Provider = new Provider();
  formProvider: FormGroup = new FormGroup({});
  activeIndex: number
  constructor(
    private prodicerService: ProviderService,
    private catalogueService: CataloguesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.createCols();
    this.getCatalogues();
    this.createForm()
  }

  createCols() {
    this.cols = [
      { field: 'codeProvi', header: 'Código proveedor' },
      { field: 'ruc', header: 'RUC' },
      { field: 'name', header: 'Nombre empresa' },
      { field: 'address', header: 'Dirección' },
      { field: 'phone', header: 'Num. Teléfono' },
      { field: 'city', header: 'Ciudad' },
      { field: 'province', header: 'Provincia' },
      { field: 'detail', header: 'Detalles' },
      { field: 'typepay', header: 'Tipo de pago' },
      { field: 'salesmanname', header: 'Nombre vendedor' },
    ];
  }
  createForm(){
    this.formProvider = this.formBuilder.group({
      dni: ['', Validators.required],
      email: ['', Validators.required],
      enterpricename: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      details: ['', Validators.required],
      paytype: ['', Validators.required],
      salername: ['', Validators.required]
    });
  }

  validateForm() {
    if (!this.formProvider.valid) {
      this.messageService.add({severity:'error', detail: 'Formulario no valido'});
      // console.log('FORM', this.formService.value);
    } else {
      console.log('FORM', this.formProvider.value);
      this.providerContainer.namenterprice = this.formProvider.controls.enterpricename.value;
      this.providerContainer.dni = this.formProvider.controls.dni.value;
      this.providerContainer.email = this.formProvider.controls.email.value;
      this.providerContainer.location = this.formProvider.controls.address.value;
      this.providerContainer.province = this.formProvider.controls.province.value;
      this.providerContainer.city = this.formProvider.controls.city.value;
      this.providerContainer.phone = this.formProvider.controls.phone.value;
      this.providerContainer.detail = this.formProvider.controls.details.value;
      this.providerContainer.paytype = this.formProvider.controls.paytype.value;
      this.providerContainer.salername = this.formProvider.controls.salername.value;
      this.saveForm(this.providerContainer);
    }
  }
saveForm(container: Provider) {
    // console.log('cotainer', container);
    this.prodicerService.saveProvider(container).subscribe(res => {
      if(res != null) this.messageService.add({severity:'success', detail: 'Registrado correctamente'});
      this.formProvider.reset();
      // console.log("SAVED?", res);
      this.chargeData(null);
    })
  }

  chargeData(event: LazyLoadEvent) {
    this.prodicerService.getProviders().subscribe(rest => {
      console.log("rest", rest);
      this.dataFromdb = rest;
    })
  }
  async getCatalogues() {
    await this.catalogueService.getCataloguebyCodeCat(PROVINCECAT).then(rest => {
      this.dropProvince = this.catalogueService.constructModel(rest);
    });
    
    await this.catalogueService.getCataloguebyCodeCat(PAYCAT).then(rest => {
      this.dropPay = this.catalogueService.constructModel(rest);
    });
  }
  onChangueProvince(event: any) {
    console.log(event.value)
    this.catalogueService.getCataloguebyCodeCatAndCodeFather(CITYCAT, PROVINCECAT, event.value).then(rest => {
      this.dropCity = this.catalogueService.constructModel(rest);
    })
  }


}
