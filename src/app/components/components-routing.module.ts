import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DeudoresComponent } from "./deudores/deudores.component";
import { HistorialComponent } from "./historial/historial.component";
import { HomeComponent } from "./home/home.component";
import { InicioComponent } from "./inicio/inicio.component";

const rutas: Routes = [
    {
        path:'',
        component: InicioComponent,
        children:[
            { path:'home', component:HomeComponent },
            { path:'deudores', component:DeudoresComponent},
            { path:'historial',component:HistorialComponent},
            { path:'**',redirectTo:'home' }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(rutas)
    ],
    exports:[
        RouterModule
    ]
})
export class ComponentsRoutingModule {}