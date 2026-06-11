import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
  },
  {
    path: 'forgotpassword',
    loadComponent: () => import('./forgotpassword/forgotpassword').then((m) => m.Forgotpassword),
  },
  {
    path: 'verifyemail',
    loadComponent: () => import('./verifyemail/verifyemail').then((m) => m.Verifyemail),
  },
  {
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
    path: 'event/:id',
    loadComponent: () => import('./event/event').then((m) => m.Event),
  },
  {
    canActivate: [authGuard],
    data: { roles: ['admin'] },
    path: 'addevent',
    loadComponent: () => import('./addevent/addevent').then((m) => m.Addevent),
  },
  {
    canActivate: [authGuard],
    data: { roles: ['admin'] },
    path: 'updatevent/:id',
    loadComponent: () => import('./addevent/addevent').then((m) => m.Addevent),
  },
  {
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.About),
  },
  {
    canActivate: [authGuard],
    data: { roles: ['admin', 'user'] },
    path: 'modificarperfil',
    loadComponent: () => import('./modificarperfil/modificarperfil').then((m) => m.Modificarperfil),
  },
];
