import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';
import { Ingreso } from '../interfaces/Ingreso';


@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor( private afs: AngularFirestore ) { }

  traerHistorial():Observable<any>{
    return this.afs.collection('ingresos').snapshotChanges();
  }
  editarIngreso(id:string){
    return this.afs.collection('ingresos').doc(id);
  }
  guardarIngreso ( ingreso: number, abonoOingr: 
    string, rut:string = '-', detalle:string = 'abono', nombre = '', apellido = ''){
    
      const ingresar =  this.afs.collection<Ingreso>('ingresos');
    ingresar.add(
      {ingreso: ingreso, fecha: Date.now(), tipo: abonoOingr, nombre, 
      rut, detalle, apellido, estado: true} );
  }
  eliminarIngreso( id:string ){
    return this.afs.collection('ingresos').doc(id).delete();
  }
  guardarCuenta( empleado: Empleado ){
    return this.afs.collection('empleados').add( empleado );
  }
  traerAdministrador():Observable<any[]>{
    return this.afs.collection('empleados').valueChanges();
  }
  
}
