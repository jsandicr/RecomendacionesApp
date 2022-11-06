import { Component, Input, OnInit } from '@angular/core';
import { Cancion } from '../../../interfaces/cancion.interface';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styles: [
  ]
})
export class CancionComponent implements OnInit {

  @Input()
  cancion!: Cancion;

  constructor() { }

  ngOnInit(): void {
  }

}
