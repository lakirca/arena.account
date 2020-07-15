import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountingPage } from './accounting';
import { InvoiceComponent } from './invoice/invoice';

const routes: Routes = [
  {
    path: '',
    component: AccountingPage,
  },
  {
    path: ':id',
    component: InvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingPageRoutingModule {}
