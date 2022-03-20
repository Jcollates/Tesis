import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/sharedAll/serviceShared/auth.service';
import { FuntionsSharedService } from 'src/app/sharedAll/serviceShared/funtions-shared.service';
import { CatProducts } from 'src/app/sislimp/shared/models/catproduct.model';
import { UsersGeneralService } from '../login/users-general.service';
import { SolProduct } from '../sharedpage/models/solproduct.model';
import { ProoductShowService } from './prooduct-show.service';
import { Simplemeet } from '../../../sislimp/shared/models/simplemeet.model';
import { BasicEmailModel } from '../../../sislimp/shared/models/emails.model';
import { EmailService } from '../../../sislimp/shared/services/email.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService]
})
export class ProductsComponent implements OnInit {




  product: ProductEquleton[] = [];
  productSelected: ProductEquleton;
  cart: ProductEquleton[] = [];
  dataTosend: SolProduct[] = [];
  pureProducts: CatProducts[] = [];

  phoneNumberUser: string;
  emailUser: string
  constructor(
    private productShowService: ProoductShowService,
    private sharedFuntions: FuntionsSharedService,
    private authService: AuthService,
    private userService: UsersGeneralService,
    private messageService: MessageService,
    private emailService: EmailService,

  ) { }

  ngOnInit(): void {
    this.getproducts();
    this.findExtraData();
  }
  addProduct(idProd: number) {
    this.productSelected = this.product.find(item => idProd == item.idProd);
    const exist = this.cart.some(prod => prod.idProd === this.productSelected.idProd);
    if (exist) {
      this.productSelected.cantidad++;
    } else {
      this.cart = [...this.cart, this.productSelected];
    }
  }

  quitProduct(idPRod: number) {
    this.productSelected = this.cart.find(item => item.idProd === idPRod);
    const moreThanOne = this.cart.some(prod => prod.idProd === this.productSelected.idProd && prod.cantidad > 1);
    if (moreThanOne) {
      this.productSelected.cantidad--;
    } else {
      this.cart = this.cart.filter(item => item.idProd !== this.productSelected.idProd);
    }
  }
  confirmProducts() {

  }
  mapperFromCatPRo(products: CatProducts[]): ProductEquleton[] {
    let all: ProductEquleton[] = [];
    products.forEach(item => {
      let productEsqueleton = new ProductEquleton();
      productEsqueleton.idProd = item.seqcatproduct;
      productEsqueleton.cantidad = 1;
      productEsqueleton.productDesq = item.description;
      productEsqueleton.productName = item.nameproduct;
      productEsqueleton.img = item.img;
      productEsqueleton.price = item.saleprize;
      all.push(productEsqueleton);
    });
    return all;
  }
  getproducts() {
    this.productShowService.getCatProducts().subscribe(rest => {
      rest.forEach(item => {
        item.img = this.sharedFuntions.repair(item.img);
      });
      this.pureProducts = rest;
      this.product = this.mapperFromCatPRo(rest);
    });
  }
  sentProducts() {
    this.fillData(this.cart);
  }
  findExtraData() {
    this.userService.getUserExtraData(this.authService.codeUser).then(rest => {
      this.phoneNumberUser = rest.phonenumber;
      this.emailUser = rest.email;
    });
  }
  constructJSON(products: ProductEquleton[]) {
    let productsSend: PoductsQuantity[] = [];

    for (let item of products) {
      const filtered = this.pureProducts.find(itemfil => itemfil.seqcatproduct == item.idProd);
      const productsQuantity: PoductsQuantity = new PoductsQuantity();
      productsQuantity.codeProd = filtered.codeproduct;
      productsQuantity.quantity = item.cantidad;
      productsSend.push(productsQuantity);
    }
    return productsSend;
  }
  fillData(cart: ProductEquleton[]) {
    if (cart.length > 0) {
      const itemToSend: SolProduct = new SolProduct();
      itemToSend.codeuser = this.authService.codeUser;
      itemToSend.products = JSON.stringify(this.constructJSON(cart));
      itemToSend.nameuser = this.authService.username;
      itemToSend.contacnumber = this.phoneNumberUser || '';
      itemToSend.email = this.emailUser || '';
      itemToSend.status = 'hold'

      this.productShowService.savesolProduct(itemToSend).subscribe(rest => {
        if (rest != null) {
          this.messageService.add({ severity: 'success', detail: 'Solicitud registrada, un asesor se contactara con usted.' });
          this.cart = [];
          this.sendEmailFromProductsToUser(rest);
          this.sendEmailFromProductsToAdmin(rest);
        }
      });
    } else {
      this.messageService.add({ severity: 'error', detail: 'Debe seleccionar al menos un producto.' });
    }
  }
  sendEmailFromProductsToUser(data: SolProduct) {
    const resetBodyEmail: BasicEmailModel = new BasicEmailModel();
    resetBodyEmail.emailTo = data.email;
    resetBodyEmail.emailFrom = 'qtandres@hotmail.com';
    resetBodyEmail.preheader = 'Estado solicitud';
    resetBodyEmail.subject = 'Estado de la solicitud';
    resetBodyEmail.username = data.nameuser;
    resetBodyEmail.request = data.seqsolproduct + "";
    this.emailService.sendNewRequestToUSER(resetBodyEmail).then(rest => {
      if (!rest.hasOwnProperty('message')) {
        console.log("EMAIL EMIAL");
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al enviar correo' });
      }
    });

  }
  sendEmailFromProductsToAdmin(data: SolProduct) {
    const resetBodyEmail: BasicEmailModel = new BasicEmailModel();
    resetBodyEmail.emailTo = 'qtandres17@gmail.com';
    resetBodyEmail.emailFrom = 'qtandres@hotmail.com';
    resetBodyEmail.preheader = 'Estado solicitud';
    resetBodyEmail.subject = 'Estado de la solicitud';
    resetBodyEmail.username = 'Administrador'
    resetBodyEmail.request = data.seqsolproduct + "";
    this.emailService.sendNewRequestToAdmin(resetBodyEmail).then(rest => {
      if (!rest.hasOwnProperty('message')) {
        console.log("EMAIL EMIAL");
      } else {
        this.messageService.add({ severity: 'error', detail: 'Error al enviar correo' });
      }
    });
  }
}

export class ProductEquleton {
  idProd: number;
  productName: string;
  productDesq: string;
  cantidad: number;
  img: string
  price: number
}

export class PoductsQuantity {
  codeProd: string;
  quantity: number;
  constructor() {
    this.codeProd = '';
    this.quantity = 0
  }
}
