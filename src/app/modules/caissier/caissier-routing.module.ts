import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaissierComponent } from './caissier.component';
import { ListeCaissierComponent } from './component/liste-caissier/liste-caissier.component';

const routes: Routes = [
  {
    path: '',
    component: CaissierComponent,
    children: [
      {
        path: '',
        component: ListeCaissierComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaissierRoutingModule { }
