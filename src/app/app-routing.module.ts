import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { logeado } from './guards/login.guards';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate:[logeado]
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaPageModule),
    canActivate:[logeado]
  },
  {
    path: 'e404',
    loadChildren: () => import('./e404/e404.module').then(m => m.E404PageModule)
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
