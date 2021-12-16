import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from '../sharedAll/guard/check-login.guard';
import { RoleGuardGuard } from '../sharedAll/guard/role-guard.guard';
import { UserGuard } from '../sharedAll/guard/user.guard';
import { AboutComponent } from './components/about/about.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FirstpageComponent } from './components/firstpage/firstpage.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ProducsAndServicesComponent } from './components/producs-and-services/producs-and-services.component';
import { ProductsComponent } from './components/products/products.component';
import { ServicesCliComponent } from './components/services-cli/services-cli.component';

const routes: Routes = [
  {
    path: '', component: FirstpageComponent, children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'about', component: AboutComponent },
      { path: 'products', component: ProductsComponent , canActivate: [CheckLoginGuard, UserGuard]},
      { path: 'proservices', component: ProducsAndServicesComponent },
      { path: 'services', component: ServicesCliComponent,canActivate: [CheckLoginGuard, UserGuard] },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'inicio' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
