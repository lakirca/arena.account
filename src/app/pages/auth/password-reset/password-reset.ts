import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.html',
  styleUrls: ['./password-reset.scss'],
})
export class PasswordResetPage implements OnInit {
  subs = new SubSink();

  showPass: boolean;
  showPass2: boolean;
  error: any[] = [];
  user_password: string;
  user_password_confirmation: string;
  passwordStrength: string;
  matched: boolean;
  proccessing: boolean;
  resetToken: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subs.sink = this.activatedRoute.params.subscribe((params: any) => {
      console.log(params);
      this.resetToken = params.id;
    });
  }

  onSubmit(form: NgForm) {
    this.proccessing = true;

    if (form.valid) {
      this.subs.sink = this.authService
        .resetPassword(
          form.value.user_password,
          form.value.user_password_confirmation,
          this.resetToken
        )
        .subscribe(
          (res: any) => {
            console.log('Reset: ', res);

            this.proccessing = false;
            this.router.navigate([`/sign-in`]);
          },
          (err: any) => {
            this.proccessing = false;
          }
        );
    }
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  showPassword2() {
    this.showPass2 = !this.showPass2;
  }

  mustMatch(password, confirmPassword): Boolean {
    if (password === confirmPassword && this.passwordStrength === 'Strong') {
      return (this.matched = true);
    } else if (
      password === confirmPassword &&
      this.passwordStrength === 'Medium'
    ) {
      return (this.matched = true);
    } else {
      return (this.matched = false);
    }
  }

  onChangePassword() {
    this.passwordStrength = AuthService.checkPasswordStrength(
      this.user_password
    );
  }
}
