import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerosRoutingModule } from './playlists-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VerComponent } from './pages/ver/ver.component';
import { AgregarComponent } from './pages/agregar/agregar.component';


@NgModule({
  declarations: [
    VerComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    GenerosRoutingModule,
    ReactiveFormsModule
  ]
})
export class PlaylistsModule { }
