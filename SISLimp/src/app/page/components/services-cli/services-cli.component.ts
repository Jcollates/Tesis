import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-cli',
  templateUrl: './services-cli.component.html',
  styleUrls: ['./services-cli.component.css']
})
export class ServicesCliComponent implements OnInit {

  service: ServiceEquleton[] = [];
  serviceSelected: ServiceEquleton;
  cart: ServiceEquleton[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setservices();
  }
  setservices() {
    this.service = [
      { serviceName: "Fumigación", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 1, cantidad: 1 },
      { serviceName: "Limpieza interna", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 2, cantidad: 1 },
      { serviceName: "Limpieza de colchones", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 3, cantidad: 1 },
      { serviceName: "Limpieza externa", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 4, cantidad: 1 },
      { serviceName: "Alfombras", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 5, cantidad: 1 },
      { serviceName: "Desinfección", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 6, cantidad: 1 },
    ]
  }
  addservice(idProd: number) {
    this.serviceSelected = this.service.find(item => idProd == item.idProd);
    const exist = this.cart.some(prod => prod.idProd === this.serviceSelected.idProd);
    if (exist) {
      this.serviceSelected.cantidad++;
    } else {
      this.cart = [...this.cart, this.serviceSelected];
    }
    console.log(exist);
    console.log(this.cart);
  }

  quitservice(idPRod: number) {
    this.serviceSelected = this.cart.find(item => item.idProd === idPRod);
    const moreThanOne = this.cart.some(prod => prod.idProd === this.serviceSelected.idProd && prod.cantidad > 1);
    if (moreThanOne) {
      this.serviceSelected.cantidad--;
    } else {
      this.cart = this.cart.filter(item => item.idProd !== this.serviceSelected.idProd);
    }
    console.log(this.serviceSelected);
    console.log(this.cart);
  }
  confirmservices() {

  }

}

export class ServiceEquleton {
  idProd: number;
  serviceName: string;
  serviceDesq: string;
  cantidad: number;
}

