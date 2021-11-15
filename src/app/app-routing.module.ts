import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'app',
    loadChildren: () => import('./components/componentes.module').then( m => m.ComponentesModule),
    canActivate: [ AngularFireAuthGuard ]
  },
  {
    path:'registro',
    component: RegistrarComponent,
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
