export interface Ingreso{
    abono:number;
    fecha: number;
    detalle?:string;
    rut?:string;
    tipo:string;
    estado: boolean;
    nombre?:string;
    apellido?:string;
  }