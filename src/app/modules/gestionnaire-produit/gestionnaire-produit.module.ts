import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionnaireProduitRoutingModule } from './gestionnaire-produit-routing.module';
import { ProduitComponent } from './components/produit/produit.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { GestionnaireProduitComponent } from './gestionnaire-produit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailProduitComponent } from './components/detail-produit/detail-produit.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ProduitComponent,
    GestionnaireProduitComponent,
    DetailProduitComponent
  ],
  imports: [
    CommonModule,
    GestionnaireProduitRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule
  ]
})
export class GestionnaireProduitModule { }
