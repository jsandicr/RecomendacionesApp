import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerComponent } from './pages/ver/ver.component';
import { AgregarComponent } from './pages/agregar/agregar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ver',
        component: VerComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
      },
      {
        path: 'editar/:id',
        component: AgregarComponent
      },
      {
        path: '*',
        redirectTo: 'ver'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CantantesRoutingModule { }
