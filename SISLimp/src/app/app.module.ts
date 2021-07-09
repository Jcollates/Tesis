import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './page/components/inicio/inicio.component';
import { ContactoComponent } from './page/components/contacto/contacto.component';
import { NavigatebarComponent } from './page/components/navigatebar/navigatebar.component';
import { AboutComponent } from './page/components/about/about.component';
import { ProductsComponent } from './page/components/products/products.component';
import { ServicesComponent } from './page/components/services/services.component';
import { ProducsAndServicesComponent } from './page/components/producs-and-services/producs-and-services.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContactoComponent,
    NavigatebarComponent,
    AboutComponent,
    ProductsComponent,
    ServicesComponent,
    ProducsAndServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
