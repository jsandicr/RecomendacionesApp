import { Component, OnInit } from '@angular/core';
import { GenerosServices } from '../../../services/generos.service';
import { Genero } from '../../../interfaces/genero.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styles: ['']
})
export class VerComponent implements OnInit {

  generos : Genero[] = [];

  constructor( private generoService: GenerosServices) { }

  ngOnInit(): void {
    this.generoService.getGeneros()
      .subscribe( generos => {
        generos.forEach(genero => {
          this.generos.push(genero);
        });
        this.generos = generos
      });
  }

  eliminar( id: number, position: number ){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger me-3',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({  
      title: '¿Seguro que quiere eliminar el genero?',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: '¡Si, eliminar!',  
      cancelButtonText: 'Cancelar'  
    }).then((result) => {
      if(result.value) {
        this.generoService.deleteGenero( id )
        .subscribe( respuesta => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado con exito!',
              showConfirmButton: false,
              timer: 1500
            })
        })
        this.generos.splice(position, 1)
      }
    })
  }
}