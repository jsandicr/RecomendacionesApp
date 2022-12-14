import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'canciones',
    loadChildren: () => import('./canciones/canciones.module')
      .then(m => m.CancionesModule)
  },
  {
    path: 'generos',
    loadChildren: () => import('./generos/generos.module')
      .then(m => m.GenerosModule)
  },
  {
    path: 'cantantes',
    loadChildren: () => import('./cantantes/cantantes.module')
      .then(m => m.CantantesModule)
  },
  {
    path: 'playlists',
    loadChildren: () => import('./playlists/playlists.module')
      .then(m => m.PlaylistsModule)
  },
  {
    path: 'albums',
    loadChildren: () => import('./albums/albums.module')
      .then(m => m.AlbumsModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
