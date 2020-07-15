import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { PaymentService } from 'src/app/core/services/payment';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from 'src/app/shared/models/invoice';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.html',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
  styleUrls: ['./invoice.scss'],
})
export class InvoiceComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  id: any;

  private invoiceSubject: BehaviorSubject<Invoice> = new BehaviorSubject(null);
  get invocie$() {
    return this.invoiceSubject.asObservable();
  }
  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subs.sink = this.activatedRoute.params.subscribe((params: any) => {
      this.id = params.id;
      this.getInvoice(params.id);
    });
  }

  getInvoice(id) {
    this.subs.sink = this.paymentService.getInvoice(id).subscribe(
      (res: any) => {
        console.log('Invoice: ', res);
        this.invoiceSubject.next(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
