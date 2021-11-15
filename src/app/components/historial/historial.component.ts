import { Component, OnInit } from '@angular/core';

import { Ingreso } from '../interfaces/Ingreso';
import { FireService } from '../services/fire.service';
import {ConfirmationService, MessageService,} from "primeng/api";
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  listaIngresos: Ingreso[] = [];
  usuarioAdmin: boolean= false;
  display: boolean = false;
  id:string = '';

  constructor(private serviciosFire: FireService,
    private confirmationService: ConfirmationService,
    private authServ: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService) { }

    miFormulario: FormGroup = this.fb.group({
      ingreso: [ , [Validators.required, Validators.min(1)] ]
    })

  ngOnInit(): void {
    this.obtenerDatos();
    this.verUsuarioAdmin();
  }
  obtenerDatos(){
    this.serviciosFire.traerHistorial().subscribe( data => {
      this.listaIngresos = [];
      data.forEach( (campo: any) => {
        
        this.listaIngresos.push({
          id: campo.payload.doc.id,
          ...campo.payload.doc.data()
        })
      });
    });
  }
  eliminarIngreso(id:string){
    this.serviciosFire.eliminarIngreso(id).then( () => {
    }, error => console.log )
  }
  confirm(event: Event, id:string) {
    this.confirmationService.confirm({
        target: event.target!,
        message: '¿Estas seguro de que deseas eliminar este registro?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.eliminarIngreso(id);
        },
        reject: () => {
            //reject action
        }
    });
  }
  verUsuarioAdmin(){
    this.authServ.obtenerUsuarioLogeado().subscribe( usuario => {
      if( usuario?.email?.toString() == 'admin@admin.cl' || 
      usuario?.email?.toString() ==  'admin.usuario@admin.cl'){
        this.usuarioAdmin = true;
      }
    } )
  }
  editarIngreso(){
    this.serviciosFire.editarIngreso(this.id).update(this.miFormulario.value);
    this.messageService.add({severity:'success', summary:'Modificacion', detail:'Se ha modificado correctamente'})
    this.display = false;
  }
  showDialog(id: string) {
    this.display = true;
    this.id = id;
  }
  //Exports excel con PrimeNG
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaIngresos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
