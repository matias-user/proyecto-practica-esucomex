import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FireService } from 'src/app/components/services/fire.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styles: [
  ]
})
export class RegistrarComponent implements OnInit{

  usuarioAdmin:boolean = false;
  nombreUsuario:string | null = '';

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private msgServ: MessageService,
              private fireService: FireService) { }

  ngOnInit(): void {
    this.verUsuarioAdmin();
    this.esAdministrador();
  }
  
  miFormulario:FormGroup = this.fb.group({
    email:['',[ Validators.required, Validators.email] ],
    pass: [ '', [Validators.required, Validators.minLength(5)] ],
    administrador: [ ]
  })

  guardar(){
    this.authService.registrarUsuario( 
      this.miFormulario.get('email')!.value,
      this.miFormulario.get('pass')!.value
     ).catch( console.log)
     this.msgServ.add({severity:'success', summary:'Registro', detail:'Usuario Registrado Correctamente'});
     this.fireService.guardarCuenta( this.miFormulario.value );
     this.miFormulario.reset();
  }
  //Forma para esconder switch al crear un usuario y a este agregarlo como administrador.
  verUsuarioAdmin(){
    this.authService.obtenerUsuarioLogeado().subscribe( usuario => {
      if( usuario ){
        this.nombreUsuario = usuario!.email;  
      }else return;
      })
  }
  esAdministrador(){
    this.fireService.traerAdministrador( )
      .subscribe( array => {
        
        array.forEach( valor =>{
          if( valor.email == this.nombreUsuario ){
            if( valor.administrador ) this.usuarioAdmin = true; 
          }}
         )
      })
  }
}
