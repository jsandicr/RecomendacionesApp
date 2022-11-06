import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';
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
    id: [],
    nombre: [, Validators.required],
    spotifyId: [, Validators.required], 
    //Arreglo para valores de un formulario, es un tipo especial de array
    generos: this.fb.array([
      ['Prueba', Validators.required]
    ]),
    cantantes: this.fb.array([
      ['Prueba', Validators.required]
    ]),
  })

  //formulario independiente para almacenar el arreglo de generos
  nuevoGenero: FormControl = this.fb.control( '', Validators.required );

  //formulario independiente para almacenar el arreglo de cantantes
  nuevoCantante: FormControl = this.fb.control( '', Validators.required );

  //Metodo para interactura con los generos del formularios
  get generosArr(){
    return this.formulario.get('generos') as FormArray;
  }

  //Metodo para interactura con los cantantes del formularios
  get cantantesArr(){
    return this.formulario.get('cantantes') as FormArray;
  }

  //Lista de generos desde la base
  generosList: string[] = ['prueba'];

  //Lista de generos desde la base
  cantantesList: string[] = ['prueba'];

  //Se inyecta el servicio para construir formularios
  constructor( private fb:    FormBuilder,
               private cancionesService: CancionesServices,
               private route: ActivatedRoute ) { }

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
          this.formulario.reset({
            id: cancion.id,
            nombre: cancion.name,
            spotifyId: cancion.spotifyId,
            generos: cancion.genre,
            cantantes: cancion.singers
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

  //Agrega el genero del combo box a la lista de generos del formulario
  agregarGenero(){
    if( this.nuevoGenero.invalid ){
      return;
    }
    this.generosArr.push( this.fb.control( this.nuevoGenero.value, Validators.required ) );
    this.nuevoGenero.reset();
  }


  //Agrega el cantante del combo box a la lista de cantanes del formulario
  agregarCantante(){
    if( this.nuevoCantante.invalid ){
      return;
    }
    this.cantantesArr.push( this.fb.control( this.nuevoCantante.value, Validators.required ) );
    this.nuevoCantante.reset();
  }

  //Recibe el la posicion del genero en el array y lo borra
  borrarGenero( i: number ){
    this.generosArr.removeAt(i);
  }

  //Recibe el la posicion del genero en el array y lo borra
  borrarCantante( i: number ){
    this.cantantesArr.removeAt(i);
  }

  //Valida que el formulario este correcto y lo envia al endpoint
  guardar(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }
    console.log(this.formulario.value);
  }

}