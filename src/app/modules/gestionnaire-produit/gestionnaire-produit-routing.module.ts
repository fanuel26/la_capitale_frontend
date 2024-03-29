import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionnaireProduitComponent } from './gestionnaire-produit.component';
import { ProduitComponent } from './components/produit/produit.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';

const routes: Routes = [
  {
    path: '',
    component: GestionnaireProduitComponent,
    children: [
      {
        path: '',
        component: ProduitComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionnaireProduitRoutingModule { }
