import { Component, OnInit } from '@angular/core';
import { FuntionsSharedService } from 'src/app/sharedAll/serviceShared/funtions-shared.service';
import { CatServices } from 'src/app/sislimp/shared/models/catservices.model';
import { ServiceShowService } from './service-show.service';

@Component({
  selector: 'app-services-cli',
  templateUrl: './services-cli.component.html',
  styleUrls: ['./services-cli.component.css']
})
export class ServicesCliComponent implements OnInit {

  service: ServiceEquleton[] = [];
  serviceSelected: ServiceEquleton;
  cart: ServiceEquleton[] = [];

  constructor(
    private serviceShowService: ServiceShowService,
    private sharedFuntions: FuntionsSharedService 
  ) { }

  ngOnInit(): void {
    this.getServices()
  }
  setservices() {
    // this.service = [
    //   { serviceName: "Fumigación", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 1, cantidad: 1 },
    //   { serviceName: "Limpieza interna", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 2, cantidad: 1 },
    //   { serviceName: "Limpieza de colchones", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 3, cantidad: 1 },
    //   { serviceName: "Limpieza externa", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 4, cantidad: 1 },
    //   { serviceName: "Alfombras", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 5, cantidad: 1 },
    //   { serviceName: "Desinfección", serviceDesq: "Compraeste cepillo o vete a mimir", idProd: 6, cantidad: 1 },
    // ]
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
  mapperFromCatPRo(products: CatServices[]): ServiceEquleton[]{
    let all:ServiceEquleton[] = [];
    products.forEach(item => {
      let serviceEsqueleton = new ServiceEquleton();
      serviceEsqueleton.idProd = item.seqcatservice;
      serviceEsqueleton.cantidad = 1;
      serviceEsqueleton.serviceDesq = item.description;
      serviceEsqueleton.serviceName = item.nameservice;
      serviceEsqueleton.img = item.img;
      all.push(serviceEsqueleton);
    });
    return all;
  }
  getServices() {
    this.serviceShowService.getCatServices().subscribe(rest => {
      console.log(rest);
      rest.forEach(item => {
        item.img = this.sharedFuntions.repair(item.img);
      });
      this.service = this.mapperFromCatPRo(rest);
    });
  }

}

export class ServiceEquleton {
  idProd: number;
  serviceName: string;
  serviceDesq: string;
  cantidad: number;
  img: string
}

