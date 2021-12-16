import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './sharedAll/guard/check-login.guard';
import { RoleGuardGuard } from './sharedAll/guard/role-guard.guard';
import { UserGuard } from './sharedAll/guard/user.guard';


const routes: Routes = [
  {
    path: 'page', loadChildren: () => import('./page/page.module').then(r => r.PageModule),
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(r => r.UserModule), pathMatch: 'prefix',
    canActivate: [CheckLoginGuard, UserGuard],
  },
  { 
    path: 'system', loadChildren: () => import('./sislimp/sislimp.module').then(r => r.SislimpModule), pathMatch: 'prefix', 
    canActivate: [CheckLoginGuard, RoleGuardGuard],
  },
  { path: '**', redirectTo: 'page' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
