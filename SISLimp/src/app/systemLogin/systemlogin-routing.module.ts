import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemLoginComponent } from './components/system-login/system-login.component';

const routes: Routes = [
  { path: '', component: SystemLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SytemloginRoutingModule { }
