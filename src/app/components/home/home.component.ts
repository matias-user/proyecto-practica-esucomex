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
    this.calcularTotales(true);
    this.calcularTotales(false);
  }

  calcularTotales(bandera:boolean ){
    
    if(bandera){
      this.servicioFire.traerHistorialGastos().subscribe( data =>{
        this.gastos = 0;
        data.forEach( (campo:any) => {
          this.gastos += campo.payload.doc.data().gasto;
        });
        this.calcularEnCaja(this.gastos, true);
      })
    }else{
      this.servicioFire.traerHistorialAbonos().subscribe( data =>{
        this.abonos = 0;
        data.forEach( (campo:any) => {
          this.abonos += campo.payload.doc.data().abono;
        });
        this.calcularEnCaja(this.abonos, false);
      })
    }
  }
  calcularEnCaja( monto: number, bandera: boolean){
    if( bandera) this.enCaja -= monto;
    else this.enCaja += monto;
  }
}
