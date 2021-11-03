import { Component, OnInit } from '@angular/core';

import { Ingreso } from '../interfaces/Ingreso';
import { FireService } from '../services/fire.service';
import {ConfirmationService,} from "primeng/api";


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  listaIngresos: Ingreso[] = [];

  constructor(private serviciosFire: FireService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenerDatos();  
  }
  obtenerDatos(){
    this.serviciosFire.traerHistorial().subscribe( data => {
      this.listaIngresos = [];
      data.forEach( (campo: any) => {
        
        this.listaIngresos.push({
          id: campo.payload.doc.id,
          ...campo.payload.doc.data()
        })
      });
    });
  }
  eliminarIngreso(id:string){
    this.serviciosFire.eliminarIngreso(id).then( () => {
      console.log('Se ha eliminado')
    }, error => console.log )
  }
  confirm(event: Event, id:string) {
    this.confirmationService.confirm({
        target: event.target!,
        message: '¿Estas seguro de que deseas eliminar este registro?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.eliminarIngreso(id);
        },
        reject: () => {
            //reject action
        }
    });
}
}
