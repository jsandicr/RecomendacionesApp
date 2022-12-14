import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';
import { PlaylistsServices } from '../../../services/playlists.service';
import { Playlist } from '../../../interfaces/playlist.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [''] 
})
export class AgregarComponent implements OnInit {

  //Formulario reactivo para almacenar la informacion
  //El primer campo esta vacio, se puede usar para asignar un valor por defecto al input
  formulario: FormGroup = this.fb.group({
    id: [],
    name: [, Validators.required],
  })

  playlists: Playlist[] = [];

  //Se inyecta el servicio para construir formularios
  constructor( private fb:    FormBuilder,
               private playlistService: PlaylistsServices,
               private route: ActivatedRoute,
               private router: Router ) { }

  //se ejecuta despues del constructor
  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap( 
          ({id}) => {
            if(!id){
              return EMPTY;
            }
            //Buscar cancion por id y retornarla
            return this.playlistService.getPlaylistById(id);  
        })
      )
      .subscribe( playlist => 
        {
          this.formulario.reset({
            id: playlist.id,
            name: playlist.name
          }) 
        }
      );
  }

  validarTitulo(){
    if(this.formulario.controls['id'].value != null)
    {
      return false
    }
    return true
  }

  //Recibe el nombre del input y valida que este correcto y ya se toco
  validarCampo( campo: string ){
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

  //Valida que el formulario este correcto y lo envia al endpoint
  guardar(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }
    if( this.formulario.controls['id'].value != null ){
      //Si el formulario tienen un valor de id quiere decir que queremos actualizar, sino insertar
      this.playlistService.updatePlaylist(this.formulario.value).subscribe( resp => this.router.navigate(['playlists/ver']) )
    }else{
      this.playlistService.postPlaylist(this.formulario.value).subscribe( resp => this.router.navigate(['playlists/ver']) )
    }
  }
}