import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancionesRoutingModule } from './canciones-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { VerComponent } from './pages/ver/ver.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgregarComponent,
    VerComponent
  ],
  imports: [
    CommonModule,
    CancionesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CancionesModule { }
