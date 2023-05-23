import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'caissier',
    loadChildren: () => import('./modules/caissier/caissier.module').then((m) => m.CaissierModule)
  },
  {
    path: 'gestionnaire',
    loadChildren: () => import('./modules/gestionnaire-produit/gestionnaire-produit.module').then((m) => m.GestionnaireProduitModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
