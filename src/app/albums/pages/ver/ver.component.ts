import { Component, OnInit } from '@angular/core';
import { AlbumsServices } from '../../../services/albums.service';
import { Album } from '../../../interfaces/album.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styles: ['']
})
export class VerComponent implements OnInit {

  albums : Album[] = [];

  constructor( private albumService: AlbumsServices) { }

  ngOnInit(): void {
    this.albumService.getAlbums()
      .subscribe( albums => {
        albums.forEach(album => {
          this.albums.push(album);
        });
        this.albums = albums
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
      title: '¿Seguro que quiere eliminar el album?',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: '¡Si, eliminar!',  
      cancelButtonText: 'Cancelar'  
    }).then((result) => {
      if(result.value) {
        this.albumService.deleteAlbum( id )
        .subscribe( album => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado con exito!',
              showConfirmButton: false,
              timer: 1500
            })
        })
        this.albums.splice(position, 1)
      }
    })
  }
}