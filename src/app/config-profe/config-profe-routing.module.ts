import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigProfePage } from './config-profe.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigProfePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigProfePageRoutingModule {}
