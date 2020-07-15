import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment';
import { SharedModule } from 'src/app/shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    IonicModule,
    PaymentPageRoutingModule,
  ],
  declarations: [PaymentPage],
})
export class PaymentPageModule {}
