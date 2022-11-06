import { Component } from '@angular/core';

interface MenuItem{
  nombre: string;
  ruta: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
    #sidebar{
      height: 100%;
      min-height: 100vh;
      min-width: 180px;
      background-color: #E26868;
    }

    li{
      cursor: pointer;
    }

    .activo{
      background-color: #FF8787;
      color: #EDEDED;
      border: 1px solid #EDEDED;
    }
    `
  ]
})

export class SidebarComponent{

  items: MenuItem[] = [
    {
      nombre: 'home',
      ruta: 'home/home'
    },
    {
      nombre: 'canciones',
      ruta: 'canciones'
    },
    {
      nombre: 'cantantes',
      ruta: 'cantantes'
    },
    {
      nombre: 'generos',
      ruta: 'generos'
    }
  ];
}