import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Ingreso } from '../interfaces/Ingreso';


@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor( private afs: AngularFirestore ) { }

  traerHistorial():Observable<any>{
    return this.afs.collection('ingresos').snapshotChanges();
  }

  guardarIngreso ( ingreso: number, abonoOingr: string, ruts:string = '-', detalles:string = '-'){
   
    const ingresar =  this.afs.collection<Ingreso>('ingresos');
    ingresar.add({abono: ingreso, fecha: Date.now(),tipo: abonoOingr,rut:ruts,detalle:detalles } );

  }
  eliminarIngreso( id:string ){
    return this.afs.collection('ingresos').doc(id).delete();
  }
}
