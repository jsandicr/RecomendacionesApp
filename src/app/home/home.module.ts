import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CancionesComponent } from './pages/canciones/canciones.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { CancionComponent } from './components/cancion/cancion.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CancionesComponent,
    BuscadorComponent,
    CancionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
