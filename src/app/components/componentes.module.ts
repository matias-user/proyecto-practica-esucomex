import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';

import { HistorialComponent } from './historial/historial.component';
import { DeudoresComponent } from './deudores/deudores.component';
import { InicioComponent } from './inicio/inicio.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FormComponent } from './shared/form/form.component';
import { FormDosComponent } from './shared/form-dos/form-dos.component';
import { ActivosPipe } from './pipes/activos.pipe';

@NgModule({
  declarations: [
    HistorialComponent,
    DeudoresComponent,
    InicioComponent,
    HomeComponent,
    MenuComponent,
    FormComponent,
    FormDosComponent,
    ActivosPipe,
    
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ComponentsRoutingModule,
    ReactiveFormsModule,
    
  ],
  exports:[
    InicioComponent,
  ]
})
export class ComponentesModule { }
