import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '../interfaces/playlist.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsServices {

  private _baseUrl: string = "http://localhost:3000/playlist";
  private _playlists: Playlist[] = [];

  constructor( private http: HttpClient ) { }

  get playlists() : Playlist[]{
    return [...this._playlists];
  }

  getPlaylists(){
    return this.http.get<Playlist[]>(this._baseUrl);
  }

  getPlaylistById( id: number ){
    return this.http.get<Playlist>(`${this._baseUrl}/${id}`);
  }

  postPlaylist( playlist: Playlist ){
    return this.http.post<Playlist>(this._baseUrl, playlist);
  }

  updatePlaylist( playlist: Playlist ){
    return this.http.put<Playlist>(`${this._baseUrl}/${playlist.id}`, playlist);
  }

  deletePlaylist( id: number ){
    return this.http.delete<Playlist>(`${this._baseUrl}/${id}`);
  }
}
