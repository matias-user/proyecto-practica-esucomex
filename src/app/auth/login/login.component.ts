import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loginFallido:boolean = false;

  usuario = {
    email: 'test1@test.cl',
    password: '123456'
  }

  constructor( private authService: AuthService, private route: Router ) { }

  ingresar(){
    const { email, password } = this.usuario;
    this.authService.login(email, password).then(res => {
      if( res?.user?.email !== undefined){
        console.clear();
        this.route.navigate(['./app/home'])
        this.loginFallido = false;
      }else{
        this.loginFallido = true;
        setTimeout(() => {
          this.loginFallido = false;
        }, 5000);
      }
    })
  }

}
