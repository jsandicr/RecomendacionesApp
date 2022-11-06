import { Component, OnInit } from '@angular/core';
import { Cancion } from '../../../interfaces/cancion.interface';
import Swal from 'sweetalert2'; 
import { CancionesServices } from '../../../services/canciones.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styles: [`
    .plus{
      pointer: cursor;
    }
  `]
})
export class VerComponent implements OnInit {

  canciones: Cancion[] = [
    {
      id: 1,
      name: 'Prueba',
      spotifyId: '',
      genre: ['prueba'],
      singers: ['prueba']
    }
  ]

  getCanciones!: Subscription;

  constructor( private cancionesService: CancionesServices ) { }

  ngOnInit(): void {
    this.getCanciones = this.cancionesService.getCanciones()
    .pipe(
      switchMap(() => this.cancionesService.getCanciones())
    )
    .subscribe( (resp) => {
      this.canciones = resp;
    })
  }

  borrar( position: number ){
    let id = this.canciones[position].id

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger me-3',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({  
      title: '¿Seguro que quiere eliminar el producto?',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: '¡Si, eliminar!',  
      cancelButtonText: 'Cancelar'  
    }).then((result) => {
      if(result.value) {
        this.cancionesService.buscarCancion( id )
        .subscribe( cancion => {
          if(cancion){
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado con exito!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        this.canciones.splice(position, 1)
      }
      //Recargar
      if(this.getCanciones){
        this.getCanciones.unsubscribe();
      }
      this.getCanciones = this.cancionesService.getCanciones()
      .subscribe( (resp) => {})
    })
  }

}
