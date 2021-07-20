import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './page/components/about/about.component';
import { ContactoComponent } from './page/components/contacto/contacto.component';
import { InicioComponent } from './page/components/inicio/inicio.component';
import { ProducsAndServicesComponent } from './page/components/producs-and-services/producs-and-services.component';
import { ProductsComponent } from './page/components/products/products.component';
import { ServicesComponent } from './page/components/services/services.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
  {path: 'inicio', component: InicioComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'about', component: AboutComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'proservices', component: ProducsAndServicesComponent},
  {path: 'services', component: ServicesComponent},
  {path: '**', redirectTo: 'inicio'}
  //login here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
