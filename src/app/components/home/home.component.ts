import { Component, OnInit } from '@angular/core';
import { FireService } from '../services/fire.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gastos:number = 0;
  abonos:number = 0;
  enCaja:number = 0;
  fecha:number = Date.now();
  value: number = 65;
  constructor( private servicioFire: FireService ) { }

  ngOnInit(): void {
    this.calcularTotales();
  }

  calcularTotales( ){
    
    this.servicioFire.traerHistorial().subscribe( data =>{
      this.abonos = 0;
      this.gastos = 0;
      this.enCaja = 0;
      
      data.forEach( (campo:any) => {
        if( campo.payload.doc.data().tipo == 'abono' ){
          this.abonos += campo.payload.doc.data().abono;
          this.calcularEnCaja(campo.payload.doc.data().abono, true);
        }else{
          this.gastos += campo.payload.doc.data().abono;
          this.calcularEnCaja(campo.payload.doc.data().abono, false);
        } 
      });
    })
  }
  calcularEnCaja( monto: number, bandera: boolean){
    if( bandera) this.enCaja += monto;
    else this.enCaja -= monto;
  }
}
