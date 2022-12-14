import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../interfaces/album.interface';

@Injectable({
  providedIn: 'root'
})
export class AlbumsServices {

  private _baseUrl: string = "http://localhost:3000/album";
  private _albums: Album[] = [];

  constructor( private http: HttpClient ) { }

  get albums() : Album[]{
    return [...this._albums];
  }

  getAlbums(){
    return this.http.get<Album[]>(this._baseUrl);
  }

  getAlbumById( id: number ){
    return this.http.get<Album>(`${this._baseUrl}/${id}`);
  }

  postAlbum( album: Album ){
    return this.http.post<Album>(this._baseUrl, album);
  }

  updateAlbum( album: Album ){
    return this.http.put<Album>(`${this._baseUrl}/${album.id}`, album);
  }

  deleteAlbum( id: number ){
    return this.http.delete<Album>(`${this._baseUrl}/${id}`);
  }
}
