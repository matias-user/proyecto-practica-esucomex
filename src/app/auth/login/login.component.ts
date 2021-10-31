import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      }
    })
    return true;
  }
  obtenerUsuario(){
    this.authService.obtenerUsuarioLogeado().subscribe(res => {
      console.log( res?.email)
    });
  }
  salir(){
    this.authService.logout();
  }

}
