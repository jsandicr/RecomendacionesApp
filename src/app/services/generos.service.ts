import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../interfaces/genero.interface';

@Injectable({
  providedIn: 'root'
})
export class GenerosServices {

  private _baseUrl: string = "http://localhost:3000/genero";
  private _generos: Genero[] = [];

  constructor( private http: HttpClient ) { }

  get generos() : Genero[]{
    return [...this._generos];
  }

  getGeneros(){
    return this.http.get<Genero[]>(this._baseUrl);
  }

  getGeneroById( id: number ){
    return this.http.get<Genero>(`${this._baseUrl}/${id}`);
  }

  postGenero( genero: Genero ){
    return this.http.post<Genero>(this._baseUrl, genero);
  }

  updateGenero( genero: Genero ){
    return this.http.put<Genero>(`${this._baseUrl}/${genero.id}`, genero);
  }

  deleteGenero( id: number ){
    return this.http.delete<Genero>(`${this._baseUrl}/${id}`);
  }
}
