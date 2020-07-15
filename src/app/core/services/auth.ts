import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/local';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  location: Location;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  get accessToken(): string {
    return this.cookieService.get('access_token') || '';
  }

  get getRefreshToken(): string {
    return this.cookieService.get('refresh_token') || '';
  }

  get isAuthorized(): boolean {
    return Boolean(this.accessToken);
  }

  static checkPasswordStrength(password: string) {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );

    if (strongRegex.test(password)) {
      return 'Strong';
    }

    if (mediumRegex.test(password)) {
      return 'Medium';
    }

    return 'Weak';
  }

  signUp(
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    inviteHash?: string
  ) {
    const req = {
      name_first: name,
      email,
      user_password: password,
      user_password_confirmation: passwordConfirm,
    };

    return this.http.post<any>('auth/signup', req).pipe(
      map((res) => {
        const data = res.data;
        this.cookieService.set('access_token', data.auth.access_token);
        this.cookieService.set('user', data.user);
        this.cookieService.set('refresh_token', data.auth.refresh_token);
        return res.data;
      })
    );
  }

  signIn(user: string, password: string, inviteHash?: string) {
    let url = `auth/signin`;
    if (inviteHash) {
      url = `soundblock/invite/${inviteHash}/signin`;
    }
    const req = { user, password };
    return this.http.post<any>(url, req).pipe(
      map((res) => {
        console.log('Login Info: ', res);
        const data = res.data;
        this.cookieService.set('access_token', data.auth.access_token);
        this.cookieService.set('user', data.user);
        this.cookieService.set('refresh_token', data.auth.refresh_token);

        return data;
      })
    );
  }

  signOut() {
    return this.http.delete('auth/signout').pipe(
      map((res) => {
        this.cookieService.delete('access_token');
        this.cookieService.delete('user');
        this.cookieService.delete('refresh_token');
        this.router.navigate(['/sign-in']);
      })
    );
  }

  checkPassword(pass) {
    const req = { current_password: pass };
    return this.http.post<any>(`auth/check-password`, req).pipe(
      map((res) => {
        return res.response;
      })
    );
  }

  forgotPassword(value, type) {
    if (type === 'email') {
      return this.http.post('auth/forgot-password', {
        email: value,
      });
    } else if (type === 'phone') {
      return this.http.post('auth/forgot-password', {
        phone: value,
      });
    } else {
      return this.http.post('auth/forgot-password', {
        alias: value,
      });
    }
  }

  resetPassword(newPass, confirmPass, resetToken) {
    const req = { new_password: newPass, confirm_password: confirmPass };
    return this.http.patch<any>(`auth/password-reset/${resetToken}`, req).pipe(
      map((res) => {
        console.log(res);

        return res.response;
      })
    );
  }

  refreshToken() {
    const req = { refresh_token: this.getRefreshToken };
    return this.http.patch<any>(`auth/refresh`, req).pipe(
      map((res) => {
        console.log('tokens', res);
        const response = res.data;
        this.cookieService.set('access_token', response.access_token);
        this.cookieService.set('refresh_token', response.refresh_token);
        return response;
      })
    );
  }

  sendMail(body: any) {
    return this.http.post(environment.apiUrl, body);
  }

  getUser() {
    return this.http.get('auth/index');
  }
}
