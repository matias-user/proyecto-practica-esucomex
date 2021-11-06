import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFallido:boolean = false;

  usuario = {
    email: '',
    password: ''
  }

  constructor( private authService: AuthService, private route: Router ) { }

  ngOnInit(): void {
  }
  ingresar(){
    const { email, password } = this.usuario;
    this.authService.login(email, password).then(res => {
      if( res?.user?.email !== undefined){

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
  obtenerUsuario(){
    this.authService.obtenerUsuarioLogeado().subscribe()
  }

}
