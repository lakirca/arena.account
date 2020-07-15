import { Component } from '@angular/core';
import { SubSink } from 'subsink';
import { AuthService } from 'src/app/core/services/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss'],
})
export class ForgotPasswordPage {
  subs = new SubSink();

  email: string;
  proccessing: boolean;
  phone: any;
  phoneProccessing: boolean;
  alias: any;
  aliasProccessing: boolean;

  show: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.proccessing = true;

    this.subs.sink = this.authService
      .forgotPassword(form.value.email, 'email')
      .subscribe(
        (res: any) => {
          this.proccessing = false;
          this.show = true;
        },
        (err: any) => {
          this.show = false;
          this.proccessing = false;
        }
      );
  }

  onPhoneSubmit(form: NgForm) {
    this.phoneProccessing = true;

    this.subs.sink = this.authService
      .forgotPassword(form.value.phone, 'phone')
      .subscribe(
        (res: any) => {
          this.phoneProccessing = false;
          this.show = true;
        },
        (err: any) => {
          this.show = false;
          this.phoneProccessing = false;
        }
      );
  }

  onAliasSubmit(form: NgForm) {
    this.aliasProccessing = true;

    this.subs.sink = this.authService
      .forgotPassword(form.value.alias, 'alias')
      .subscribe(
        (res: any) => {
          this.aliasProccessing = false;
          this.show = true;
        },
        (err: any) => {
          this.show = false;
          this.aliasProccessing = false;
        }
      );
  }

  // On Key Press event
  valudateNumber(e: KeyboardEvent) {
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
      (e.keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
      (e.keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
      (e.keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
      (e.keyCode >= 35 && e.keyCode <= 39) // Home, End, Left, Right
    ) {
      return; // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    else if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  }

  ionViewDidLeave() {
    this.subs.unsubscribe();
  }
}
