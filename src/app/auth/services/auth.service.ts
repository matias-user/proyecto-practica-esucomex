import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _pase: boolean = false;
  get pase(){
    return this._pase;
  }

  constructor( private afa: AngularFireAuth) { }

  async login(email:string, password: string){

    try {
      
      return await this.afa.signInWithEmailAndPassword( email, password );

    } catch (error) {
      console.log( 'No existe el correo',error );
      return null;
    }
  }
  obtenerUsuarioLogeado(){
    return this.afa.authState;
  }
  logout(){
    return this.afa.signOut();
  }

}
