import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesPageRoutingModule } from './services-routing.module';

import { ServicesPage } from './services';
import { ServiceInfoComponent } from './service-info/service-info';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    IonicModule,
    ServicesPageRoutingModule,
  ],
  declarations: [ServicesPage, ServiceInfoComponent],
})
export class ServicesPageModule {}
