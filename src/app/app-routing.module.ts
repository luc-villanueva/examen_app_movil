import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { redirectIfAuthGuard } from './redirect-if-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), canActivate: [redirectIfAuthGuard] },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [authGuard] },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule), canActivate: [authGuard] },
  { path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigPageModule), canActivate: [authGuard] },
  { path: 'registrar', loadChildren: () => import('./registrar/registrar.module').then(m => m.RegistrarPageModule), canActivate: [redirectIfAuthGuard] },
  { path: 'localizacion', loadChildren: () => import('./localizacion/localizacion.module').then(m => m.LocalizacionPageModule), canActivate: [authGuard] },
  { path: 'qr-scan', loadChildren: () => import('./qr-scan/qr-scan.module').then( m => m.QrScanPageModule), canActivate: [authGuard] },
  { path: 'config-profe', loadChildren: () => import('./config-profe/config-profe.module').then( m => m.ConfigProfePageModule), canActivate: [authGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
