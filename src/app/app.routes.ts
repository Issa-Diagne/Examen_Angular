// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { 
    path: 'clients', 
    loadComponent: () => import('./components/client-list/client-list.component').then(m => m.ClientListComponent)
  },
  { 
    path: 'clients/:id', 
    loadComponent: () => import('./components/client-details/client-details.component').then(m => m.ClientDetailsComponent)
  },
  { 
    path: 'clients/:id/add-dette', 
    loadComponent: () => import('./components/add-dette/add-dette.component').then(m => m.AddDetteComponent)
  },
  { 
    path: 'clients/:id/dettes', 
    loadComponent: () => import('./components/dette-list/dette-list.component').then(m => m.DetteListComponent)
  },
  { 
    path: 'dettes/:id/add-paiement', 
    loadComponent: () => import('./components/add-paiement/add-paiement.component').then(m => m.AddPaiementComponent)
  },
  { 
    path: 'dettes/:id/paiements', 
    loadComponent: () => import('./components/paiement-list/paiement-list.component').then(m => m.PaiementListComponent)
  },
  { path: '**', redirectTo: '/clients' }
];