import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-form-tres',
  templateUrl: './form-tres.component.html',
  styleUrls: ['./form-tres.component.css']
})
export class FormTresComponent implements OnInit {

  display: boolean = false;
  patronRut: string = '^[0-9]+-[0-9kK]{1}$';
  
  constructor(private fb: FormBuilder,
              private fireServ: FireService,
              private messageService: MessageService) { }

  miFormulario: FormGroup = this.fb.group({
    nombre:['', [Validators.required, Validators.minLength(3)]],
    apellido:['', [Validators.required, Validators.minLength(3)]],
    rut:['',[Validators.required, Validators.pattern(this.patronRut)] ]
  })

  ngOnInit(): void {
  }
  showDialog() {
    this.display = true;
  }
  guardar(){
    if( this.miFormulario.invalid ){
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.fireServ.guardarFuncionario(this.miFormulario.value);
    this.miFormulario.reset();
    this.messageService.add({severity:'success', summary:'Funcionario', detail:'Se ha ingresado correctamente'});
  }
}
