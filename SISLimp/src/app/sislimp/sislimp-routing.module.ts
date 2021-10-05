import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamientoCitasComponent } from './components/agendamiento-citas/agendamiento-citas.component';
import { AtencionClienteComponent } from './components/atencion-cliente/atencion-cliente.component';
import { PrincipalComponent } from './components/principal/principal.component';
const routes: Routes = [
  {
    path: '', component: PrincipalComponent, children:[
      {path: 'booking', component: AgendamientoCitasComponent},
      {path: 'customerattention', component: AtencionClienteComponent},
      { path: '**', redirectTo: 'booking' },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SislimpRoutingModule { }
