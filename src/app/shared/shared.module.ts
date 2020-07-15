import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from 'ng-click-outside';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HeaderComponent } from './components/header/header';
import { HeaderFacade } from '../core/facades/header.facade';
import { HeaderState } from 'src/app/core/states/header.state';
import { FooterComponent } from './components/footer/footer';
import { LoaderComponent } from './components/loader/loader';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent],
  imports: [
    CommonModule,
    ClickOutsideModule,
    RouterModule,
    TimeagoModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [HeaderComponent, TimeagoModule, FooterComponent, LoaderComponent],
  providers: [HeaderFacade, HeaderState],
})
export class SharedModule {}
