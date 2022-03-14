import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { PoductsQuantity } from 'src/app/page/components/products/products.component';
import { SolProduct } from 'src/app/page/components/sharedpage/models/solproduct.model';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { ProductosService } from 'src/app/sislimp/components/gestion-inventario-products/productos.service';
import { ProductModel } from 'src/app/sislimp/shared/models/products.model';
import { OdersService } from '../orders/oders.service';
import { UsersGeneralService } from '../../../page/components/login/users-general.service';
import { SimpleMeetService } from '../../../sislimp/components/agendamiento-citas/simple-meet.service';
import { UserGeneralModel } from '../../../sharedAll/models/usergeneral.model';
import { SimplemeetHistory } from '../../../sislimp/shared/models/siemplemeetHistory.model';
const REQUESTSTATUSCAT = 'REQUESTSTATUSCAT';
const SERVICETYPE = 'SERVICETYPE';
@Component({
  selector: 'app-buy-history',
  templateUrl: './buy-history.component.html',
  styleUrls: ['./buy-history.component.css']
})
export class BuyHistoryComponent implements OnInit {

  cols: any[];
  colsServi: any[];
  dataFromdb: SolProduct[] = [];
  sizeRecords: number = 10;
  sizeRecordsServi: number = 10;
  pageSize: number = 10;
  pageSizeServi: number = 10;
  drop: SelectItem[] = [];
  comingProducts: PoductsQuantity[] = [];
  realPRoducts: ProductModel[] = [];
  solProduct: SolProduct[] = [];
  showedProducts: boolean = false;
  showedServices: boolean = false;
  solProductShow: SolProduct = new SolProduct();
  simplemeetHistory: SimplemeetHistory = new SimplemeetHistory();
  colsProducts: any[] = [];
  colsServices: any[] = [];
  activeIndex1: number = 0;
  dataFromdbServices: SimplemeetHistory[] = [];
  serviceTypes: SelectItem[] = [];

  constructor(
    private orderService: OdersService,
    private authService: AuthService,
    private productsService: ProductosService,
    private catalogueService: CataloguesService,
    private userService: UsersGeneralService,
    private simpleMeetService: SimpleMeetService,
  ) {
  }

  ngOnInit() {
    this.createCols();
    this.getCatalogues();
  }
  createCols() {
    this.cols = [
      { field: 'date', header: 'Fecha' },
      { field: 'product', header: 'Producto' },
      { field: 'status', header: 'Estado' },
    ]
    this.colsProducts = [
      { field: 'productservice', header: 'Producto' },
      { field: 'cost', header: 'Costo' },
      { field: 'detail', header: 'Detalle' },
    ]
    this.colsServices = [
      { field: 'productservice', header: 'Servicio' },
      { field: 'detail', header: 'Detalle' },
    ]
    this.colsServi = [
      { field: 'date', header: 'Fecha' },
      { field: 'product', header: 'Servicio' },
      { field: 'status', header: 'Estado' },
    ]

  }
  getCatalogues() {
    this.catalogueService.getCataloguebyCodeCat(REQUESTSTATUSCAT).then(rest => {
      this.drop = this.catalogueService.constructModel(rest);
    });
    this.catalogueService.getCataloguebyCodeCat(SERVICETYPE).then(rest => {
      this.serviceTypes = this.catalogueService.constructModel(rest);
    });
  }
  transformFromJSON(value: string) {
    return JSON.parse(value);
  }
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
  getSolProducts(event: LazyLoadEvent) {
    this.orderService.getSolProducts(this.authService.codeUser).subscribe(rest => {
      if (rest.length > 0) {
        rest.forEach(async item => {
          let productsQuantity: PoductsQuantity[] = [];
          productsQuantity = [...productsQuantity, ...this.transformFromJSON(item.products)];
          item.elementAsArray = await this.getProductsRelated(productsQuantity);
        });

        this.dataFromdb = rest.filter(item => item.status != 'hold' && item.status != 'process');
      }
    })
  }

  //show 
  showProducts(solproduct: SolProduct) {
    this.solProductShow = { ...solproduct };
    this.showedProducts = true;
  }
  async getUserExtraData(event: LazyLoadEvent) {
    let userData: UserGeneralModel;
    await this.userService.getUserExtraData(Number(localStorage.getItem('code'))).then(rest => {
      if (rest) {
        userData = rest;
      }
    });
    this.simpleMeetService.getSimpleMeetsHistoryByname(userData.name, userData.lastname, userData.email).then(rest => {
      if (rest.length > 0) {
        rest.forEach(item => item.elementsAsArray = JSON.parse(item.addededServices));
        this.dataFromdbServices = rest;

      }
    });
  }
  showServices(service: SimplemeetHistory) {
    this.simplemeetHistory = { ...service };
    this.showedServices = true;
  }

}