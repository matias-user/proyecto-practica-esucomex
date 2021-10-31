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

  listaGastos: Gasto[] = [];
  listaAbonos: Ingreso[] = [];
  cols: any[] = [];

  constructor(private serviciosFire: FireService) { }

  ngOnInit(): void {
    this.obtenerDatos();  

  this.cols = [
      { field: 'rut', header: 'RUT' },
      { field: 'gasto', header: 'Gasto' },
      { field: 'detalle', header: 'Detalle' }
    ];
  }
  obtenerDatos(){
    this.serviciosFire.traerHistorialGastos().subscribe( data => {
      this.listaGastos = [];
      data.forEach( (campo: any) => {
        
        this.listaGastos.push({
          id: campo.payload.doc.id,
          ...campo.payload.doc.data()
        })
      });
      console.log( this.listaGastos )
    })
    this.serviciosFire.traerHistorialAbonos().subscribe( data => {
      this.listaAbonos = [];
      data.forEach( (campo: any) => {
        
        this.listaAbonos.push({
          id: campo.payload.doc.id,
          ...campo.payload.doc.data()
        })
      });
    })
  }
  eliminarIngreso(id:string, ingreso:string){
    this.serviciosFire.eliminarIngreso(id,ingreso).then( () => {
      console.log('Se ha eliminado')
    }, error => console.log )
  }
}
