import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',

})
export class FormComponent  {

  presionadoBoton:boolean = false;

  miFormulario: FormGroup = this.formBuilder.group({
    ingreso: [ 0, [ Validators.required, Validators.min(1)]],
  })

  constructor(private formBuilder: FormBuilder, 
    private afs: FireService,
    private messageService: MessageService) { }

  esValido(){
    return this.miFormulario.controls.ingreso.errors
            && this.miFormulario.controls.ingreso.touched
  }
  ingresar(){
    if( this.miFormulario.invalid ){
      this.miFormulario.markAllAsTouched();
      this.presionadoBoton = true;
      return;
    }

    this.afs.guardarIngreso( this.miFormulario.controls.ingreso.value, 'abono' )
    this.miFormulario.reset();
    this.messageService.add({severity:'success', summary:'Abono ingresado', detail:'Se ha ingresado correctamente'});
  }

}
