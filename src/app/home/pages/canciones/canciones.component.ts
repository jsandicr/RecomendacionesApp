import { Component, Input, OnInit } from '@angular/core';
import { Cancion } from '../../../interfaces/cancion.interface';
import { CancionesServices } from '../../services/canciones.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styles: [
  ]
})
export class CancionesComponent implements OnInit {

  error: boolean = false;
  
  @Input()
  termino!: string;

  mostrarSugerencias: boolean = false;
  canciones: Cancion[] = [];
  cancionesSugeridas: Cancion[] = [];

  constructor( private cancionesService: CancionesServices ) { }

  ngOnInit(): void {
  }

  //Se ejecuta con el click de la opcion del buscador
  buscar( id: number){
    this.canciones = [];
    this.error = false;
    this.cancionesService.buscarCancion(id)
      .subscribe( (canciones) => {
        this.canciones.push(canciones)
      }, (err) => {
        this.error = true;
        this.canciones = [];
      });
  }

  //Se ejecuta con se presiona enter en el buscador
  sugerencias(termino:string){
    this.error = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.cancionesService.sugerenciaCancion(termino)
      .subscribe(
        canciones => this.cancionesSugeridas = canciones.splice(0, 5),
        err => this.cancionesSugeridas = []
      );
  }

}
