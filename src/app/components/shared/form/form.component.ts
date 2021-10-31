import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    ingreso: [ 0, [ Validators.required, Validators.min(1)]],
  })

  constructor(private formBuilder: FormBuilder, private afs: FireService) { }

  ngOnInit(): void {
  }
  esValido(){
    return this.miFormulario.controls.ingreso.errors
            && this.miFormulario.controls.ingreso.touched
  }
  ingresar(){
    if( this.miFormulario.invalid ){
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.afs.guardarIngreso( this.miFormulario.controls.ingreso.value, true )
    this.miFormulario.reset();
  }

}
