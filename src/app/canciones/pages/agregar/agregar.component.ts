import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';
import { Cantante } from 'src/app/interfaces/cantante.interface';
import { Genero } from 'src/app/interfaces/genero.interface';
import { CantantesServices } from 'src/app/services/cantantes.service';
import { GenerosServices } from 'src/app/services/generos.service';
import { CancionesServices } from '../../../services/canciones.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [''] 
})
export class AgregarComponent implements OnInit {

  //Formulario reactivo para almacenar la informacion
  //El primer campo esta vacio, se puede usar para asignar un valor por defecto al input
  formulario: FormGroup = this.fb.group({
    _id: [],
    id: [],
    name: [, Validators.required],
    spotifyId: [, Validators.required], 
    //Arreglo para valores de un formulario, es un tipo especial de array
  })

  //Se inyecta el servicio para construir formularios
  constructor( private fb:    FormBuilder,
               private cancionesService: CancionesServices,
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
            return this.cancionesService.buscarCancion(id);  
        })
      )
      .subscribe( cancion => 
        {
          console.log(cancion)
          this.formulario.reset({
            id: cancion.id,
            name: cancion.name,
            spotifyId: cancion.spotifyId,
            generos: cancion.generos,
            cantantes: cancion.cantantes
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
      this.cancionesService.updateCancion(this.formulario.value).subscribe( resp => this.router.navigate(['canciones/ver']) )
    }else{
      this.cancionesService.postCancion(this.formulario.value).subscribe( resp => this.router.navigate(['canciones/ver']) )
    }
  }

}