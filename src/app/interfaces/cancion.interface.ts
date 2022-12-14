export interface Cancion{
    _id        : string;
    id         : number;
    name       : string;
    spotifyId  : string;
    generos    ?: string[];
    cantantes  ?: string[];
}