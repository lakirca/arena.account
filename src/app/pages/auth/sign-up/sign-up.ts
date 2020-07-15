import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
})
export class SignUpPage implements OnInit {
  showPass: boolean;
  showPass2: boolean;
  error: any[] = [];
  email: string;
  name_first: string;
  user_password: string;
  user_password_confirmation: string;
  passwordStrength: string;
  matched: boolean;
  proccessing: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.proccessing = true;

    if (form.valid) {
      const username = form.value.name_first;
      const email = form.value.email;
      const password = form.value.user_password;
      const password_confirmation = form.value.password_confirmation;

      this.authService
        .signUp(username, email, password, password_confirmation)
        .subscribe(
          (res: any) => {
            this.proccessing = false;
          },
          (err: any) => {
            this.proccessing = false;

            if (err.error) {
              console.error(err.error);
              if (err.error.errors) {
                if (err.error.errors.email) {
                  this.error = err.error.errors.email;
                }
              }
            }
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
