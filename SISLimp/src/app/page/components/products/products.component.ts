import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: ProductEquleton[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setProducts();
  }
  setProducts(){
    this.product = [
      {productName: "Cepillo", productDesq: "Compraeste cepillo o vete a mimir"},
      {productName: "Ducha", productDesq: "Compraeste cepillo o vete a mimir"},
      {productName: "Cartera", productDesq: "Compraeste cepillo o vete a mimir"},
      {productName: "Radio", productDesq: "Compraeste cepillo o vete a mimir"},
      {productName: "Cloro", productDesq: "Compraeste cepillo o vete a mimir"},
      {productName: "Desinfectante", productDesq: "Compraeste cepillo o vete a mimir"},
    ]
  }

}

export class ProductEquleton{
  productName: string;
  productDesq: string;
}
