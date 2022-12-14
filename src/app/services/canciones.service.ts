import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancion } from '../interfaces/cancion.interface';

@Injectable({
  providedIn: 'root'
})
export class CancionesServices {

  private _baseUrl: string = "http://localhost:3000/cancion";
  private _canciones: Cancion[] = [];

  constructor( private http: HttpClient) { }

  get canciones() : Cancion[]{
    return [...this._canciones];
  }

  getCanciones(){
    return this.http.get<Cancion[]>(`${this._baseUrl}`)
  }

  postCancion( cancion: Cancion ){
    return this.http.post<Cancion>(this._baseUrl, cancion);
  }

  updateCancion( cancion: Cancion ){
    return this.http.put<Cancion>(`${this._baseUrl}/${cancion.id}`, cancion);
  }

  buscarCancion( id: number ): Observable<Cancion>{
    return this.http.get<Cancion>(`${this._baseUrl}/${id}`)
  }

  sugerenciasCancion( termino: string ):Observable<Cancion[]>{
      //Solamente retorna id y nombre
      return this.http.get<Cancion[]>(`${this._baseUrl}/buscador/${termino}`)
  }

  deleteCancion( id: number ): Observable<any>{
    return this.http.delete(`${ this._baseUrl }/${ id }`)
  }
}
