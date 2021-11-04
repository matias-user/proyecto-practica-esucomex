import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './auth/guards/guard.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'app',
    loadChildren: () => import('./components/componentes.module').then( m => m.ComponentesModule),
    canActivate: [GuardGuard],
    // canLoad: [GuardGuard]
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
