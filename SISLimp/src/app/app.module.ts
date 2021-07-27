import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './page/components/inicio/inicio.component';
import { ContactoComponent } from './page/components/contacto/contacto.component';
import { NavigatebarComponent } from './page/components/navigatebar/navigatebar.component';
import { AboutComponent } from './page/components/about/about.component';
import { ProductsComponent } from './page/components/products/products.component';
import { ProducsAndServicesComponent } from './page/components/producs-and-services/producs-and-services.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './page/components/footer/footer.component';
import { ServicesCliComponent } from './page/components/services-cli/services-cli.component';
import { LoginComponent } from './page/components/login/login.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './user/components/shared/navigation/navigation.component';
import { BuyHistoryComponent } from './user/components/buy-history/buy-history.component';
import { OrdersComponent } from './user/components/orders/orders.component';
import { AccountDetailComponent } from './user/components/account-detail/account-detail.component';
import { OutComponent } from './user/components/out/out.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContactoComponent,
    NavigatebarComponent,
    AboutComponent,
    ProductsComponent,
    ServicesCliComponent,
    ProducsAndServicesComponent,
    FooterComponent,
    LoginComponent,
    NavigationComponent,
    BuyHistoryComponent,
    OrdersComponent,
    AccountDetailComponent,
    OutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
