import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FireService } from '../services/fire.service';
import { map } from 'rxjs/operators';
import { Empleado } from '../interfaces/empleado';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  gastos:number       = 0;
  abonos:number       = 0;
  enCaja:number       = 0;
  fecha:number        = Date.now();
  usuarioAdmin:boolean = false;
  valorGrafica: number | string = 0;
  nombreUsuario:string | null = '';

  constructor( private servicioFire: FireService,
              private authService: AuthService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.calcularTotales();
    this.verUsuarioAdmin();
    this.esAdministrador();
  }

  calcularTotales( ){
    
    this.servicioFire.traerHistorial().subscribe( data =>{
      this.abonos = 0;
      this.gastos = 0;
      this.enCaja = 0;
      this.valorGrafica = 0;

      data.forEach( (campo:any) => {
        if( campo.payload.doc.data().tipo == 'abono' ){
          this.abonos += campo.payload.doc.data().ingreso;
          this.calcularEnCaja(campo.payload.doc.data().ingreso, true);
        }else{
          this.gastos += campo.payload.doc.data().ingreso;
          this.calcularEnCaja(campo.payload.doc.data().ingreso, false);
        } 
        this.valorGrafica = (this.gastos * 100) / this.abonos;
        this.valorGrafica = this.valorGrafica.toFixed();  
      });
    })
  }
  calcularEnCaja( monto: number, bandera: boolean){
    if( bandera)this.enCaja += monto; 
    else this.enCaja -= monto;
  }
  verUsuarioAdmin(){
    this.authService.obtenerUsuarioLogeado().subscribe( usuario => {
      if( usuario ){
        this.nombreUsuario = usuario!.email;
      }else return;
      })
  }
  esAdministrador(){
    this.servicioFire.traerAdministrador( )
      .subscribe( array => {
        array.forEach( valor =>{
          if( valor.email == this.nombreUsuario ){
            if( valor.administrador ) this.usuarioAdmin = true; 
          }}
         )
      })
  }
  borrarTodo(){
    this.servicioFire.traerHistorial().subscribe( resp => {
      for( let data of resp ){
        let id = data.payload.doc.id;
        
        this.servicioFire.eliminarIngreso(id).catch(console.error)
      }
    } )
  }
  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target!,
        message: '¿Estas seguro que deseas eliminar todos los registros?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.borrarTodo();
        },
        reject: () => {
        }
    });
  }
}
