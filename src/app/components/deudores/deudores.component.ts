import { Component, OnInit } from '@angular/core';
import { ConfirmationService} from 'primeng/api';
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

  constructor(private fireServ: FireService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenerDeudores();
  }
  obtenerDeudores(){
    this.fireServ.traerFuncionarios().subscribe( data => {
      data.forEach( (campo:any) => {
        
        this.listaDeudores.push({
          id: campo.payload.doc.id,
          ...campo.payload.doc.data()
        })
      });
      console.log(this.listaDeudores)
    } )
  }
  eliminarFuncionario(id:string){
    this.fireServ.eliminarFuncionario(id);
  }

  confirm(event: Event, id:string) {
    this.confirmationService.confirm({
        target: event.target!,
        message: '¿Estas seguro que deseas eliminar un funcionario?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.eliminarFuncionario(id);
        },
        reject: () => {
        }
    });
  }
    // cambiarEstado(id:string){
  //   this.fireServ.editarIngreso(id).update({estado: false}) ;
  // }
}
