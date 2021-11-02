import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Funcionario } from '../interfaces/funcionario';
import { Ingreso } from '../interfaces/Ingreso';


@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor( private afs: AngularFirestore ) { }

  traerHistorial():Observable<any>{
    return this.afs.collection('ingresos').snapshotChanges();
  }
  traerFuncionarios():Observable<any>{
    return this.afs.collection('funcionarios').snapshotChanges();
  }
  editarIngreso(id:string){
    return this.afs.collection('ingresos').doc(id);
  }
  guardarIngreso ( ingreso: number, abonoOingr: 
    string, rut:string = '-', detalle:string = '-', nombre = '', apellido = ''){
    
      const ingresar =  this.afs.collection<Ingreso>('ingresos');
    ingresar.add(
      {abono: ingreso, fecha: Date.now(), tipo: abonoOingr, nombre, 
      rut, detalle, apellido, estado: true} );
  }
  guardarFuncionario(funcionario: any){
    const ingreso = this.afs.collection<Funcionario>('funcionarios');
    ingreso.add( { ...funcionario } )
  }
  eliminarIngreso( id:string ){
    return this.afs.collection('ingresos').doc(id).delete();
  }
}
