import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styles: [
  ]
})
export class RegistrarComponent implements OnInit {

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private msgServ: MessageService) { }
  
  miFormulario:FormGroup = this.fb.group({
    email:['',[ Validators.required, Validators.email] ],
    pass: [ '', [Validators.required, Validators.minLength(5)] ]
  })

  ngOnInit(): void {
  }
  guardar(){
    this.authService.registrarUsuario( 
      this.miFormulario.get('email')!.value,
      this.miFormulario.get('pass')!.value
     )
     this.msgServ.add({severity:'success', summary:'Registro', detail:'Usuario Registrado Correctamente'});
     this.miFormulario.reset();
  }

}
