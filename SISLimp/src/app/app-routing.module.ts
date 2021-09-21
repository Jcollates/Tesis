import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'page', loadChildren: ()=> import('./page/page.module').then(r => r.PageModule)},
  { path: 'user', loadChildren: ()=> import('./user/user.module').then(r => r.UserModule),pathMatch: 'prefix' },
  { path: '**', redirectTo: 'page' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
