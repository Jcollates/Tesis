import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: ProductEquleton[] = [];
  productSelected: ProductEquleton;
  cart: ProductEquleton[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setProducts();
  }
  setProducts() {
    this.product = [
      { productName: "Cepillo", productDesq: "Compraeste cepillo o vete a mimir", idProd: 1, cantidad: 1 },
      { productName: "Ducha", productDesq: "Compraeste cepillo o vete a mimir", idProd: 2, cantidad: 1 },
      { productName: "Cartera", productDesq: "Compraeste cepillo o vete a mimir", idProd: 3, cantidad: 1 },
      { productName: "Radio", productDesq: "Compraeste cepillo o vete a mimir", idProd: 4, cantidad: 1 },
      { productName: "Cloro", productDesq: "Compraeste cepillo o vete a mimir", idProd: 5, cantidad: 1 },
      { productName: "Desinfectante", productDesq: "Compraeste cepillo o vete a mimir", idProd: 6, cantidad: 1 },
    ]
  }
  addProduct(idProd: number) {
    this.productSelected = this.product.find(item => idProd == item.idProd);
    const exist = this.cart.some(prod => prod.idProd === this.productSelected.idProd);
    if (exist) {
      this.productSelected.cantidad++;
    } else {
      this.cart = [...this.cart, this.productSelected];
    }
    console.log(exist);
    console.log(this.cart);
  }

  quitProduct(idPRod: number) {
    this.productSelected = this.cart.find(item => item.idProd === idPRod);
    const moreThanOne = this.cart.some(prod => prod.idProd === this.productSelected.idProd && prod.cantidad > 1);
    if (moreThanOne) {
      this.productSelected.cantidad--;
    } else {
      this.cart = this.cart.filter(item => item.idProd !== this.productSelected.idProd);
    }
    console.log(this.productSelected);
    console.log(this.cart);
  }
  confirmProducts() {

  }

}

export class ProductEquleton {
  idProd: number;
  productName: string;
  productDesq: string;
  cantidad: number;
}
