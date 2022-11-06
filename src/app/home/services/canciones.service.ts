import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cancion } from '../../interfaces/cancion.interface';

@Injectable({
    providedIn:'root'
})  
export class CancionesServices {
    constructor(private http: HttpClient){}

    private url:string = 'http://localhost:3000'

    buscarCancion( id: number ):Observable<Cancion>{
        return this.http.get<Cancion>(`${this.url}/${id}`)
    }

    sugerenciaCancion( termino: string ):Observable<Cancion[]>{
        //Solamente retorna id y nombre
        return this.http.get<Cancion[]>(`${this.url}/termino/${termino}`)
    }
    
}