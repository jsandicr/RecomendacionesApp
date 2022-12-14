import { Component, OnInit } from '@angular/core';
import { PlaylistsServices } from '../../../services/playlists.service';
import { Playlist } from '../../../interfaces/playlist.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styles: ['']
})
export class VerComponent implements OnInit {

  playlists : Playlist[] = [];

  constructor( private playlistService: PlaylistsServices) { }

  ngOnInit(): void {
    this.playlistService.getPlaylists()
      .subscribe( playlists => {
        playlists.forEach(playlist => {
          this.playlists.push(playlist);
        });
        this.playlists = playlists
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
      title: '¿Seguro que quiere eliminar la playlist?',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: '¡Si, eliminar!',  
      cancelButtonText: 'Cancelar'  
    }).then((result) => {
      if(result.value) {
        this.playlistService.deletePlaylist( id )
        .subscribe( playlist => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado con exito!',
              showConfirmButton: false,
              timer: 1500
            })
        })

      }
    })
    this.playlists.splice(position, 1)
  }
}