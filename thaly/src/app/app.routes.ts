import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'flores',
    loadComponent: () => import('./flores/flores.component').then(m => m.FloresComponent),
  },
];
