import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CantantesRoutingModule } from './cantantes-routing.module';
import { VerComponent } from './pages/ver/ver.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    CantantesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CantantesModule { }
