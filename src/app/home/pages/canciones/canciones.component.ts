import { Component, OnInit } from '@angular/core';
import { CancionesServices } from 'src/app/services/canciones.service';
import { Cancion } from '../../../interfaces/cancion.interface';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styles: [
    `
    li{
      cursor: pointer;
    }
    `
  ]
})
export class CancionesComponent implements OnInit {

  termino: string = "";
  error: boolean = false;
  canciones: Cancion[] = [];
  cancionesSugeridas: Cancion[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private cancionesService: CancionesServices ) { }

  ngOnInit(): void {
  }

  //Se utiliza para llenar el arreglo de canciones desde la base
  buscar( id: number){
    this.error = false;
    this.cancionesService.buscarCancion(id)
    .subscribe( cancion => {
        this.canciones = [];
        this.canciones.push(cancion)
        this.mostrarSugerencias = false;
      }, (err) => {
        this.error = true;
        this.canciones = [];
      });
  }

  //Se ejecuta cuando se ingresa un valor en el input
  sugerencias(termino:string){
    if(termino == ''){
      this.mostrarSugerencias = false;
      return;
    }
    this.error = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.cancionesService.sugerenciasCancion(termino)
      .subscribe(
        canciones => this.cancionesSugeridas = canciones.splice(0, 5),
        err => this.cancionesSugeridas = []
      );
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async onFocusOut(){
    await this.delay(700);
    this.mostrarSugerencias = false;
  }
}
