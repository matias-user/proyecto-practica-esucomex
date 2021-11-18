import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];
  constructor(private authServ: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {label:'Inicio',icon:'pi pi-home',routerLink:['/app/home']},
      {label:'Deudores',icon:'pi pi-user',routerLink:['/app/deudores']},
      {label:'Historial',icon:'pi pi-folder',routerLink:['/app/historial']},
      { label: 'Registrar usuario',icon:'pi pi-plus',routerLink:['/registro'] },
      { label: 'Cerrar Sesion',icon:'pi pi-sign-in',command: () => this.cerrarSesion() },
      

    ]
  }
  cerrarSesion(){
    this.authServ.logout();
    this.router.navigate(['/'])
  }
  
}
