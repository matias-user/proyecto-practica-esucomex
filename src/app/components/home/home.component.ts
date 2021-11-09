import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FireService } from '../services/fire.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gastos:number       = 0;
  abonos:number       = 0;
  enCaja:number       = 0;
  fecha:number        = Date.now();
  usuarioAdmin:boolean = false;
  valorGrafica: number | string = 0;

  constructor( private servicioFire: FireService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.calcularTotales();
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
      if( usuario?.email?.toString() == 'admin@admin.cl' || usuario?.email?.toString() == 'admin.usuario@admin.cl' ){
        this.usuarioAdmin = true;
      }
    } )
  }
}
