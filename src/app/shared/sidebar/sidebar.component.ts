import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
    #sidebar{
      height: 100%;
      min-height: 100vh;
      min-width: 180px;
      background-color: #1DB954;
    }
    `
  ]
})
export class SidebarComponent implements OnInit {

  historial: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  buscar(element: string){

  }

}
