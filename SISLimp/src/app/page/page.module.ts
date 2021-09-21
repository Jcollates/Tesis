import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { NavigatebarComponent } from './components/navigatebar/navigatebar.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { ServicesCliComponent } from './components/services-cli/services-cli.component';
import { ProducsAndServicesComponent } from './components/producs-and-services/producs-and-services.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { FirstpageComponent } from './components/firstpage/firstpage.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ 
    InicioComponent,
    ContactoComponent,
    FooterComponent,
    AboutComponent,
    ProductsComponent,
    ServicesCliComponent,
    ProducsAndServicesComponent,
    NavigatebarComponent,
    LoginComponent,
    FirstpageComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    NgbModule
  ]
})
export class PageModule { }
