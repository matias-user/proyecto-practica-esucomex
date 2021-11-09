import { Component, OnInit } from '@angular/core';
import { ConfirmationService} from 'primeng/api';
import { Ingreso } from '../interfaces/Ingreso';
import { Usuario } from '../interfaces/usuario.interface';
import { FireService } from '../services/fire.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
})
export class DeudoresComponent implements OnInit {

  listaDeudores: Ingreso[] = [];
  usuarioAdmin: boolean= false;
  
  constructor(private fireServ: FireService,
    private confirmationService: ConfirmationService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerDeudores();
    this.verUsuarioAdmin();
  }

  obtenerDeudores(){
    this.fireServ.traerHistorial().subscribe( data => {
      this.listaDeudores = []
      data.forEach( (campo:any) => {
        
        this.listaDeudores.push({
          id: campo.payload.doc.id,
          ...campo.payload.doc.data()
        })
      });
    } )
  }

  confirm(event: Event, id:string) {
    this.confirmationService.confirm({
        target: event.target!,
        message: '¿Estas seguro que deseas eliminar un funcionario?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.cambiarEstado(id);
        },
        reject: () => {
        }
    });
  }
    cambiarEstado(id:string){
    this.fireServ.editarIngreso(id).update({estado: false}) ;
  }
  verUsuarioAdmin(){
    this.authService.obtenerUsuarioLogeado().subscribe( usuario => {
      if( usuario?.email?.toString() == 'admin@admin.cl' ||
      usuario?.email?.toString() == 'admin.usuario@admin.cl'  ){
        this.usuarioAdmin = true;
      }else{
        return;
      }
    } )
  }
}
