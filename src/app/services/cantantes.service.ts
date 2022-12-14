import { Injectable } from '@angular/core';
import { Cantante } from '../interfaces/cantante.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CantantesServices {

  private _baseUrl: string = "http://localhost:3000/cantante";
  private _canciones: Cantante[] = [];

  constructor( private http: HttpClient ) { }

  get canciones() : Cantante[]{
    return [...this._canciones];
  }

  getCantantes(){
    return this.http.get<Cantante[]>(this._baseUrl);
  }

  getCantanteById( id: number ){
    return this.http.get<Cantante>(`${this._baseUrl}/${id}`);
  }

  postCantante( cantante: Cantante ){
    return this.http.post<Cantante>(this._baseUrl, cantante);
  }

  updateCantante( cantante: Cantante ){
    return this.http.put<Cantante>(`${this._baseUrl}/${cantante.id}`, cantante);
  }

  deleteCantante( id: number ){
    return this.http.delete<Cantante>(`${this._baseUrl}/${id}`);
  }
}
