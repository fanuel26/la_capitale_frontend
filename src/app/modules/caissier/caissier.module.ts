import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaissierRoutingModule } from './caissier-routing.module';
import { CaissierComponent } from './caissier.component';
import { ListeCaissierComponent } from './component/liste-caissier/liste-caissier.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { EtatComponent } from './component/etat/etat.component';


@NgModule({
  declarations: [
    CaissierComponent,
    ListeCaissierComponent,
    EtatComponent
  ],
  imports: [
    CommonModule,
    CaissierRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule
  ]
})
export class CaissierModule { }
