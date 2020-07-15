import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  getPayPals(user) {
    return this.http
      .get('user/profile/paypal', {
        params: {
          user,
        },
      })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  addPayPal(body) {
    return this.http.post('user/profile/paypal', body);
  }

  updatePayPal(body) {
    return this.http.patch('user/profile/paypal', body);
  }

  deletePayPal(paypal) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      paypal,
    };

    return this.http.delete('user/profile/paypal', httpOptions);
  }

  getBanks(user) {
    return this.http
      .get('user/profile/bank', {
        params: {
          user,
        },
      })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  addBank(body) {
    return this.http.post('user/profile/bank', body);
  }

  updateBank(body) {
    return this.http.patch('user/profile/bank', body);
  }

  deleteBank(bank) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      bank,
    };

    return this.http.delete('user/profile/bank', httpOptions);
  }

  // Invoice Service
  getInvoices() {
    return this.http.get('account/invoices').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getInvoice(invoice_uuid) {
    return this.http.get(`account/invoice/${invoice_uuid}`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
