import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './auth/guards/guard.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'app',
    loadChildren: () => import('./components/componentes.module').then( m => m.ComponentesModule),
    canActivate: [ GuardGuard ]
  },
  {
    path:'registro',
    component: RegistrarComponent,
    // canActivate: [GuardGuard]
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
