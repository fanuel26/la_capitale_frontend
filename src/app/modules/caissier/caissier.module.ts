import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaissierRoutingModule } from './caissier-routing.module';
import { CaissierComponent } from './caissier.component';


@NgModule({
  declarations: [
    CaissierComponent
  ],
  imports: [
    CommonModule,
    CaissierRoutingModule
  ]
})
export class CaissierModule { }
