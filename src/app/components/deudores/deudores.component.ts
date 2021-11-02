import { Component, OnInit } from '@angular/core';
import { Ingreso } from '../interfaces/Ingreso';
import { FireService } from '../services/fire.service';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent implements OnInit {

  listaDeudores: Ingreso[] = [];
  idActualizar:string = '';

  constructor(private fireServ: FireService) { }

  ngOnInit(): void {
    this.obtenerDeudores();
  }
  obtenerDeudores(){
    this.fireServ.traerHistorial().subscribe( data => {
      data.forEach( (campo:any) => {
        
        this.listaDeudores.push({
          id: campo.payload.doc.id,
          ...campo.payload.doc.data()
        })
      });
      console.log(this.listaDeudores)
    } )
  }
  cambiarEstado(id:string){
    this.fireServ.editarIngreso(id).update({estado: false}) ;
  }
}
