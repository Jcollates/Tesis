import { Component, OnInit } from '@angular/core';
import { FuntionsSharedService } from 'src/app/sharedAll/serviceShared/funtions-shared.service';
import { CatServices } from 'src/app/sislimp/shared/models/catservices.model';
import { SolService } from '../sharedpage/models/solservice.model';
import { ServiceShowService } from './service-show.service';
import { AuthService } from '../../../sharedAll/serviceShared/auth.service';
import { MessageService } from 'primeng/api';
import { UsersGeneralService } from '../login/users-general.service';
import { BasicEmailModel } from '../../../sislimp/shared/models/emails.model';
import { EmailService } from '../../../sislimp/shared/services/email.service';

@Component({
  selector: 'app-services-cli',
  templateUrl: './services-cli.component.html',
  styleUrls: ['./services-cli.component.css'],
  providers: [MessageService]

})
export class ServicesCliComponent implements OnInit {

  service: ServiceEquleton[] = [];
  serviceSelected: ServiceEquleton;
  cart: ServiceEquleton[] = [];
  pureServices: CatServices[] = [];
  phoneNumberUser: string;
  emailUser: string
  diableButton: boolean = true;

  constructor(
    private serviceShowService: ServiceShowService,
    private sharedFuntions: FuntionsSharedService,
    private authService: AuthService,
    private userService: UsersGeneralService,
    private messageService: MessageService,
    private emailService: EmailService,

  ) { }

  ngOnInit(): void {
    this.getServices();
    this.findExtraData();
  }

  addservice(idProd: number) {
    this.messageService.add({ severity: 'success', detail: 'Añadido' });
    this.serviceSelected = this.service.find(item => idProd == item.idProd);
    const exist = this.cart.some(prod => prod.idProd === this.serviceSelected.idProd);
    if (exist) {
      this.serviceSelected.cantidad++;
    } else {
      this.cart = [...this.cart, this.serviceSelected];
    }
  }

  quitservice(idPRod: number) {
    this.serviceSelected = this.cart.find(item => item.idProd === idPRod);
    const moreThanOne = this.cart.some(prod => prod.idProd === this.serviceSelected.idProd && prod.cantidad > 1);
    if (moreThanOne) {
      this.serviceSelected.cantidad--;
    } else {
      this.cart = this.cart.filter(item => item.idProd !== this.serviceSelected.idProd);
    }
  }
  confirmservices() {

  }
  mapperFromCatPRo(products: CatServices[]): ServiceEquleton[] {
    let all: ServiceEquleton[] = [];
    products.forEach(item => {
      let serviceEsqueleton = new ServiceEquleton();
      serviceEsqueleton.idProd = item.seqcatservice;
      serviceEsqueleton.cantidad = 1;
      serviceEsqueleton.serviceDesq = item.description;
      serviceEsqueleton.serviceName = item.nameservice;
      serviceEsqueleton.img = item.img;
      serviceEsqueleton.price = item.hourprize;
      all.push(serviceEsqueleton);
    });
    return all;
  }
  getServices() {
    this.serviceShowService.getCatServices().subscribe(rest => {
      if (rest.length > 0) {
        rest.forEach(item => {
          item.img = this.sharedFuntions.repair(item.img);
        });
        this.pureServices = rest;
        this.service = this.mapperFromCatPRo(rest);
      }

    });
  }
  sendServices() {
    this.fillData(this.cart);

  }
  findExtraData() {
    this.userService.getUserExtraData(this.authService.codeUser).then(rest => {
      this.phoneNumberUser = rest.phonenumber;
      this.emailUser = rest.email;
    });
  }
  fillData(cart: ServiceEquleton[]) {
    if (cart.length > 0) {
      const itemToSend: SolService = new SolService();
      itemToSend.codeuser = this.authService.codeUser;
      itemToSend.services = JSON.stringify(this.constructJSON(cart));
      itemToSend.nameuser = this.authService.username;
      itemToSend.contacnumber = this.phoneNumberUser || '';
      itemToSend.email = this.emailUser || '';
      itemToSend.status = 'hold'

      this.serviceShowService.saveSolService(itemToSend).subscribe(rest => {
        if (rest != null) {
          this.messageService.add({ severity: 'success', detail: 'Solicitud registrada, un asesor se contactara con usted.' });
          this.cart = [];
          this.sendEmailFromProductsToUser(rest);
          this.sendEmailFromProductsToAdmin(rest);
        }
      });
    } else {
      this.messageService.add({ severity: 'error', detail: 'Debe seleccionar al menos un servicio.' });
      return;
    }
  }
  constructJSON(services: ServiceEquleton[]) {
    let productsSend: ServicesQuantity[] = [];

    for (let item of services) {
      const filtered = this.pureServices.find(itemfil => itemfil.seqcatservice == item.idProd);
      const productsQuantity: ServicesQuantity = new ServicesQuantity();
      productsQuantity.codeService = filtered.codeservice;
      productsQuantity.quantity = item.cantidad;
      productsSend.push(productsQuantity);
    }
    return productsSend;
  }

  sendEmailFromProductsToUser(data: SolService) {
    const resetBodyEmail: BasicEmailModel = new BasicEmailModel();
    resetBodyEmail.emailTo = data.email;
    resetBodyEmail.emailFrom = 'qtandres@hotmail.com';
    resetBodyEmail.preheader = 'Estado solicitud';
    resetBodyEmail.subject = 'Estado de la solicitud';
    resetBodyEmail.username = data.nameuser;
    resetBodyEmail.request = data.seqsolservice + "";
    this.emailService.sendNewRequestToUSER(resetBodyEmail).then(rest => {
      if (!rest.hasOwnProperty('message')) {
        console.log("EMAIL EMIAL");
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al enviar correo' });
      }
    });

  }
  sendEmailFromProductsToAdmin(data: SolService) {
    const resetBodyEmail: BasicEmailModel = new BasicEmailModel();
    resetBodyEmail.emailTo = 'qtandres17@gmail.com';
    resetBodyEmail.emailFrom = 'qtandres@hotmail.com';
    resetBodyEmail.preheader = 'Estado solicitud';
    resetBodyEmail.subject = 'Estado de la solicitud';
    resetBodyEmail.username = 'Administrador'
    resetBodyEmail.request = data.seqsolservice + "";
    this.emailService.sendNewRequestToAdmin(resetBodyEmail).then(rest => {
      if (!rest.hasOwnProperty('message')) {
        console.log("EMAIL EMIAL");
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al enviar correo' });
      }
    });
  }
}

export class ServiceEquleton {
  idProd: number;
  serviceName: string;
  serviceDesq: string;
  cantidad: number;
  img: string;
  price: number;
}
export class ServicesQuantity {
  codeService: string;
  quantity: number;
  constructor() {
    this.codeService = '';
    this.quantity = 0
  }
}
