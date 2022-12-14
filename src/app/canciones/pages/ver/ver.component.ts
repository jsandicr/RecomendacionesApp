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
      _id: '',
      id: 0,
      name: '',
      spotifyId: ''
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

  borrar( id: number, position: number ){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger me-3',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({  
      title: '¿Seguro que quiere eliminar el album?',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: '¡Si, eliminar!',  
      cancelButtonText: 'Cancelar'  
    }).then((result) => {
      if(result.value) {
        this.cancionesService.deleteCancion( id )
        .subscribe( cancion => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado con exito!',
              showConfirmButton: false,
              timer: 1500
            })
        })
        this.canciones.splice(position, 1)
      }
    })
  }
}
