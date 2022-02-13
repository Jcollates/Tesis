import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { PoductsQuantity } from 'src/app/page/components/products/products.component';
import { SolProduct } from 'src/app/page/components/sharedpage/models/solproduct.model';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';
import { CataloguesService } from 'src/app/sharedAll/serviceShared/catalogues.service';
import { ProductosService } from 'src/app/sislimp/components/gestion-inventario-products/productos.service';
import { ProductModel } from 'src/app/sislimp/shared/models/products.model';
import { OdersService } from '../orders/oders.service';
const REQUESTSTATUSCAT = 'REQUESTSTATUSCAT';

@Component({
  selector: 'app-buy-history',
  templateUrl: './buy-history.component.html',
  styleUrls: ['./buy-history.component.css']
})
export class BuyHistoryComponent implements OnInit {

  cols: any[];
  dataFromdb: SolProduct[] = [];
  sizeRecords: number = 50;
  pageSize: number = 50;
  drop: SelectItem[] = [];
  comingProducts: PoductsQuantity[] = [];
  realPRoducts: ProductModel[] = [];
  solProduct: SolProduct[] = [];
  showedProducts: boolean = false;
  solProductShow: SolProduct = new SolProduct();
  colsProducts: any[] = [];

  constructor(
    private orderService: OdersService,
    private authService: AuthService,
    private productsService: ProductosService,
    private catalogueService: CataloguesService,
  ) {
  }

  ngOnInit() {
    this.createCols();
    this.getCatalogues();
  }
  createCols() {
    this.cols = [
      { field: 'date', header: 'Fecha' },
      { field: 'user', header: 'Usuario' },
      { field: 'product', header: 'Producto' },
      { field: 'service', header: 'Servicio' },
      { field: 'email', header: 'Email' },
      { field: 'status', header: 'Estado' },
    ]
    this.colsProducts = [
      { field: 'productservice', header: 'Producto' },
      { field: 'cost', header: 'Costo' },
      { field: 'detail', header: 'Detalle' },
    ]

  }
  getCatalogues() {
    this.catalogueService.getCataloguebyCodeCat(REQUESTSTATUSCAT).then(rest => {
      this.drop = this.catalogueService.constructModel(rest);
    })
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
      console.log("Code prod", item.codeProd);
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
        
        this.dataFromdb = rest.filter(item => item.status != 'hold' && item.status != 'proccess');
        console.log("VEAMOS ", this.dataFromdb);
      }
    })
  }

  //show 
  showProducts(solproduct: SolProduct) {
    this.solProductShow = { ...solproduct};
    console.log("showProducts", this.solProductShow)
    this.showedProducts = true;
  }

}