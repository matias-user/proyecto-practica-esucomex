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

    } catch (error) {
      console.log( 'No existe el correo' );
      return;
    }
  }
  registrarUsuario(email:string, pass:string){
    return new Promise( (resolve, reject) =>{
      this.afa.createUserWithEmailAndPassword(email, pass)
        .then( userData => {
          resolve(userData)
          
        }).catch( console.log )
    })
  }

  obtenerUsuarioLogeado(){
    return this.afa.authState
  }
  logout(){
    return this.afa.signOut();
  }
 
}
