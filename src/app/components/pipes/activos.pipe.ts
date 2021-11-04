import { Pipe, PipeTransform } from '@angular/core';
import { Ingreso } from '../interfaces/Ingreso';

@Pipe({
  name: 'activos'
})
export class ActivosPipe implements PipeTransform {

  nuevoArray:Ingreso[] = [];

  transform(array: Ingreso[]){
    
    this.nuevoArray = [];
    
    array.forEach( ingreso => {
      if( ingreso.estado ) this.nuevoArray.push(ingreso)
    })

    return this.nuevoArray;
  }

}
