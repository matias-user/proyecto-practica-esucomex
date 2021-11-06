import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor( private afa: AngularFireAuth) { }

  async login(email:string, password: string){

    try {
      
      return await this.afa.signInWithEmailAndPassword( email, password )
        .catch( console.log ) ;

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
