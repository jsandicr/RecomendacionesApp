export interface Cancion{
    id        : number;
    name      : string;
    spotifyId : string;
    genre    ?: string[];
    singers  ?: string[];
}