import { Component, OnInit } from '@angular/core';
import { Gasto } from '../interfaces/Gasto';
import { Ingreso } from '../interfaces/Ingreso';
import { FireService } from '../services/fire.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  listaIngresos: Ingreso[] = [];

  constructor(private serviciosFire: FireService) { }

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
      console.log( this.listaIngresos);
    });

    // this.serviciosFire.traerHistorialAbonos().subscribe( data => {
    //   this.listaAbonos = [];
    //   data.forEach( (campo: any) => {
        
    //     this.listaAbonos.push({
    //       id: campo.payload.doc.id,
    //       rut: '-',
    //       detalle: '-',
    //       ...campo.payload.doc.data()
    //     })
    //   });
    // })
  }
  eliminarIngreso(id:string, ingreso:string){
    this.serviciosFire.eliminarIngreso(id,ingreso).then( () => {
      console.log('Se ha eliminado')
    }, error => console.log )
  }
}
