import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-form-dos',
  templateUrl: './form-dos.component.html',
  styles: [`:host ::ng-deep .p-button {margin: 0 .5rem 0 0;min-width: 10rem;}
p {margin: 0;}.confirmation-content {display: flex;align-items: center;justify-content: center;
  }:host ::ng-deep .p-dialog .p-button {min-width: 6rem;}`]
})
export class FormDosComponent {

  patronRut: string = '^[0-9]+-[0-9kK]{1}$';
  display: boolean = false;

  miFormulario: FormGroup =  this.frm.group({
    gasto: [ 0, [Validators.required, Validators.min(1)]],
    rut: ['', [Validators.required, Validators.pattern(this.patronRut)]],
    nombre: ['', [Validators.required, Validators.minLength(3)] ],
    apellido: ['', [Validators.required, Validators.minLength(3)] ],
    detalle: ['']
  })
  constructor( 
    private frm: FormBuilder,
    private fire: FireService,
    private messageService: MessageService) { }

  guardar(){
    if( this.miFormulario.invalid ){
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.fire.guardarIngreso( 
      this.miFormulario.controls.gasto.value, 'gasto',
      this.miFormulario.controls.rut.value, this.miFormulario.controls.detalle.value,
      this.miFormulario.controls.nombre.value, this.miFormulario.controls.apellido.value
     )
     this.miFormulario.reset();
     this.messageService.add({severity:'success', summary:'Esgreso!', detail:'Se ha ingresado correctamente'});
     this.display = false;
  }
  esValido(campo: string){
    return this.miFormulario.controls[campo].errors
          && this.miFormulario.controls[campo].touched
  }
  showDialog() {
    this.display = true;
  }
}
