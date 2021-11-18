import { Component, OnInit } from '@angular/core';
import { ConfirmationService} from 'primeng/api';
import { Ingreso } from '../interfaces/Ingreso';
import { FireService } from '../services/fire.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
})
export class DeudoresComponent implements OnInit {

  listaDeudores: Ingreso[] = [];
  usuarioAdmin: boolean= false;
  nombreUsuario:string | null = '';
  constructor(private fireServ: FireService,
    private confirmationService: ConfirmationService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerDeudores();
    this.verUsuarioAdmin();
    this.esAdministrador();
  }

  obtenerDeudores(){
    this.fireServ.traerHistorial().subscribe( data => {
      this.listaDeudores = []
      data.forEach( (campo:any) => {
        
        this.listaDeudores.push({
          id: campo.payload.doc.id,
          ...campo.payload.doc.data()
        })
      });
    } )
  }

  confirm(event: Event, id:string) {
    this.confirmationService.confirm({
        target: event.target!,
        message: '¿Estas seguro que deseas eliminar un funcionario?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.cambiarEstado(id);
        },
        reject: () => {
        }
    });
  }
  cambiarEstado(id:string){
    this.fireServ.editarIngreso(id).update({estado: false}) ;
  }
  //Con estas dos funciones puedo ocultar el boton para quitar un deudor
  verUsuarioAdmin(){
    this.authService.obtenerUsuarioLogeado().subscribe( usuario => {
      if( usuario){
        this.nombreUsuario = usuario!.email;
      }else return;
      })
  }
  esAdministrador(){
    this.fireServ.traerAdministrador()
      .subscribe( array => {
        array.forEach( valor =>{
          if( valor.email == this.nombreUsuario ){
            if( valor.administrador ) this.usuarioAdmin = true; 
          }}
         )
      })
  }
  generarPdf(nombre: string, apellido:string, monto:string, rut:string){

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text('Comprobante de rendicion', 10, 10);
    doc.setFontSize(22);
    doc.text(`$ ${monto}`, 160, 10);

    doc.setFontSize(16);
    doc.text( `${rut} ${apellido}`, 10, 60 )
    doc.line(10, 65, 75, 65);
    doc.setFontSize(14);
    doc.setFont("courier", "normal");
    doc.text( 'Deudor', 10, 70 )

    doc.line(120, 65, 180, 65);
    doc.text( 'Firma validez', 120, 70 )

    doc.save(`${nombre}-${apellido}.pdf`);
  }
}
