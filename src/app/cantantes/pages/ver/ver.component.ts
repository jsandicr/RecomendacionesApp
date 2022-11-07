import { Component, OnInit } from '@angular/core';
import { CantantesServices } from '../../../services/cantantes.service';
import { Cantante } from '../../../interfaces/cantante.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styles: ['']
})
export class VerComponent implements OnInit {

  cantantes : Cantante[] = [];

  constructor( private cantanteService: CantantesServices) { }

  ngOnInit(): void {
    this.cantanteService.getCantantes()
      .subscribe( cantantes => {
        cantantes.forEach(cantante => {
          this.cantantes.push(cantante);
        });
        this.cantantes = cantantes
      });
  }

  eliminar( id: number ){
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
        this.cantanteService.deleteCantante( id )
        .subscribe( respuesta => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado con exito!',
              showConfirmButton: false,
              timer: 1500
            })
        })
      }
    })
    this.cantanteService.deleteCantante(id)
      .subscribe( result => {
        console.log(result)
      })
  }
}
