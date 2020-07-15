import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountingPageRoutingModule } from './accounting-routing.module';

import { AccountingPage } from './accounting';
import { SharedModule } from 'src/app/shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { InvoiceComponent } from './invoice/invoice';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    IonicModule,
    AccountingPageRoutingModule,
  ],
  declarations: [AccountingPage, InvoiceComponent],
})
export class AccountingPageModule {}
