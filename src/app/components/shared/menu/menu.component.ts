import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label:'Inicio',icon:'pi pi-home',routerLink:['/app/home']},
      {label:'Deudores',icon:'pi pi-user',routerLink:['/app/deudores']},
      {label:'Historial',icon:'pi pi-folder',routerLink:['/app/historial']}
    ]
  }

}
