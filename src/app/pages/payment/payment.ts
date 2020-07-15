import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PaymentService } from 'src/app/core/services/payment';
import { CookieService } from 'ngx-cookie-service';
import { SubSink } from 'subsink';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bank } from 'src/app/shared/models/bank';
import { PayPal } from 'src/app/shared/models/paypal';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.html',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
  styleUrls: ['./payment.scss'],
})
export class PaymentPage {
  private subs = new SubSink();

  userId: any;
  pattern: any = /^\d{9}$/;
  bank: Bank = new Bank();
  bankConfig: any;
  banksSubject: BehaviorSubject<Bank[]> = new BehaviorSubject([]);
  get banks$(): Observable<Bank[]> {
    return this.banksSubject.asObservable();
  }

  paypal: PayPal = new PayPal();
  payPalConfig: any;
  payPalsSubject: BehaviorSubject<PayPal[]> = new BehaviorSubject([]);
  get payPals$(): Observable<PayPal[]> {
    return this.payPalsSubject.asObservable();
  }

  constructor(
    private paymentService: PaymentService,
    private cookieService: CookieService
  ) {}

  ionViewDidEnter() {
    this.userId = this.cookieService.get('user');
    this.getBanks();
    this.getPayPals();
  }

  getBanks() {
    this.subs.sink = this.paymentService
      .getBanks(this.userId)
      .subscribe((res: any) => {
        console.log(res);
        this.banksSubject.next(res);
      });
  }

  onBankSubmit(form) {
    if (form.valid) {
      if (form.value.flag_primary === 1) {
        form.value.flag_primary = 1;
      } else if (form.value.flag_primary === true) {
        form.value.flag_primary = 1;
      } else {
        form.value.flag_primary = 0;
      }

      console.log(form.value.bank_uuid);

      if (form.value.bank_uuid) {
        const body = {
          user: this.userId,
          ...form.value,
        };
        console.log(body);
        this.subs.sink = this.paymentService
          .updateBank(body)
          .subscribe((res: any) => {
            console.log(res);
          });
      } else {
        const body = {
          user: this.userId,
          account_number: form.value.account_number,
          account_type: form.value.account_typey,
          routing_number: form.value.routing_number,
          bank_name: form.value.bank_namey,
          flag_primary: form.value.flag_primary,
        };

        console.log(body);
        this.subs.sink = this.paymentService
          .addBank(body)
          .subscribe((res: any) => {
            console.log(res);
          });
      }
    }
  }

  getPayPals() {
    this.subs.sink = this.paymentService
      .getPayPals(this.userId)
      .subscribe((res: any) => {
        console.log(res);
        this.payPalsSubject.next(res);
      });
  }

  onPayPalSubmit(form) {
    if (form.valid) {
      if (form.value.flag_primary === 1) {
        form.value.flag_primary = 1;
      } else if (form.value.flag_primary === true) {
        form.value.flag_primary = 1;
      } else {
        form.value.flag_primary = 0;
      }

      if (form.value.paypal_uuid) {
        const body = {
          paypal: form.value.paypal_uuid,
          user: this.userId,
          paypal_email: form.value.paypal_email,
          flag_primary: form.value.flag_primary,
        };

        this.subs.sink = this.paymentService
          .updatePayPal(body)
          .subscribe((res: any) => {
            console.log(res);
          });
      } else {
        const body = {
          user: this.userId,
          paypal_email: form.value.paypal_email,
          flag_primary: form.value.flag_primary,
        };

        this.subs.sink = this.paymentService
          .addPayPal(body)
          .subscribe((res: any) => {
            console.log(res);
          });
      }
    }
  }

  ionViewDidLeave() {
    this.userId = undefined;
    this.subs.unsubscribe();
  }
}
