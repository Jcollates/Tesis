import { Component, OnInit } from '@angular/core';
import { PoductsQuantity } from 'src/app/page/components/products/products.component';
import { SolProduct } from 'src/app/page/components/sharedpage/models/solproduct.model';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';
import { ProductosService } from 'src/app/sislimp/components/gestion-inventario-products/productos.service';
import { ProductModel } from 'src/app/sislimp/shared/models/products.model';
import { OdersService } from './oders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  cards: any[] = [];
  comingProducts: PoductsQuantity[] = [];
  realPRoducts: ProductModel[] = [];
  solProduct: SolProduct[] = [];
  constructor(
    private orderService: OdersService,
    private authService: AuthService,
    private productsService: ProductosService
  ) { }

  ngOnInit(): void {
    this.getSolProducts();
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
      // console.log("du",duplicate);
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
  async getSolProducts() {
    this.orderService.getSolProducts(this.authService.codeUser).subscribe(rest => {
      rest.forEach(async item => {
        let productsQuantity: PoductsQuantity[] = [];
        productsQuantity = [...productsQuantity, ...this.transformFromJSON(item.products)];
        item.elementAsArray =  await this.getProductsRelated(productsQuantity);
      });
      this.solProduct = rest;
      
      console.log("VEAMOS ", this.solProduct);
      console.log("VEAMOS ", rest);

    })
  }

}
