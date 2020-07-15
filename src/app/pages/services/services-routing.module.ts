import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesPage } from './services';
import { ServiceInfoComponent } from './service-info/service-info';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage,
  },
  {
    path: ':id',
    component: ServiceInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPageRoutingModule {}
