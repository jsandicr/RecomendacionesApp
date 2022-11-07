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

  youtubeRedirect: string = "https://www.youtube.com/results?search_query="
  spotifyRedirect: string = "https://open.spotify.com/artist/"

  constructor() { }

  ngOnInit(): void {
    this.youtubeRedirect += this.cancion.name+"+"+this.cancion.singers;
    this.spotifyRedirect += this.cancion.spotifyId
    console.log(this.spotifyRedirect)
  }

}
