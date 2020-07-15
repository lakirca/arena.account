import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth';
import { CookieService } from 'ngx-cookie-service';
import { NotificationsService } from 'src/app/core/services/notifications';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss'],
})
export class SignInPage {
  private subs = new SubSink();

  password: any = '';
  email: any = '';
  returnUrl: string;

  error = false;
  showPass: boolean;
  proccessing: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private notificationService: NotificationsService,
    private authService: AuthService
  ) {}

  ionViewDidEnter() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.signOut();
  }

  signOut() {
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
    this.cookieService.delete('user');
  }

  signIn(form: NgForm) {
    this.proccessing = true;
    this.subs.sink = this.authService
      .signIn(this.email, this.password)
      .subscribe(
        (res) => {
          this.error = false;
          this.proccessing = false;
          this.notificationService.listen(res.user);
          this.router.navigate([`${this.returnUrl}`]);
        },
        (err) => {
          console.error(err);
          this.error = true;
          this.proccessing = false;
        }
      );
  }

  navigate(url: string) {
    if (this.returnUrl === '/') {
      this.router.navigate([`/auth/${url}`]);
    } else {
      this.router.navigate([`/auth/${url}`], {
        queryParams: { returnUrl: this.returnUrl },
      });
    }
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  ionViewDidLeave() {
    this.subs.unsubscribe();
  }
}
