import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'devocionais',
    loadComponent: () => import('./components/devocionais/devocionais.component').then(m => m.DevocionaisComponent)
  },
  {
    path: 'podcasts',
    loadComponent: () => import('./components/podcasts/podcasts.component').then(m => m.PodcastsComponent)
  },
  {
    path: 'plano-leitura',
    loadComponent: () => import('./components/plano-leitura/plano-leitura.component').then(m => m.PlanoLeituraComponent)
  },
  {
    path: 'estudos-biblicos',
    loadComponent: () => import('./components/estudos-biblicos/estudos-biblicos.component').then(m => m.EstudosBiblicosComponent)
  },
  {
    path: 'mensagens',
    loadComponent: () => import('./components/mensagens/mensagens.component').then(m => m.MensagensComponent)
  },
  {
    path: 'recursos',
    loadComponent: () => import('./components/recursos/recursos.component').then(m => m.RecursosComponent)
  }
];

