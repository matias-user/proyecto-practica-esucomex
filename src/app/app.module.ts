import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ComponentesModule } from './components/componentes.module';
import { ComponentsRoutingModule } from './components/components-routing.module';
import { AuthModule } from './auth/auth.module';

// Importar register de amgular common, el localEs es un nombre dado por mi.
import localEs from "@angular/common/locales/es-CL";
import { registerLocaleData } from "@angular/common";

registerLocaleData( localEs );//Funcion para implementes el es-CL
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AuthModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ComponentsRoutingModule,
    ComponentesModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-CL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
