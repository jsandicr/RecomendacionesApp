import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cancion } from '../../../interfaces/cancion.interface';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: [
  ]
})
export class BuscadorComponent implements OnInit {

  termino: string = "";

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
  }

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length == 0){
      return;
    }
  }

}
