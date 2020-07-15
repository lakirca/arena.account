import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // GET user profile information
  getUserInfo(user) {
    return this.http
      .get('user/profile', {
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

  updateUserName(body, user) {
    return this.http.patch(`office/user/${user}`, body).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  updateAvatar(body) {
    return this.http.post('user/avatar', body);
  }

  // Password
  updatePassword(body, user) {
    return this.http.patch(`office/user/${user}/security`, body);
  }

  // ==========================
  //  User Addresses Endpoints
  // ==========================

  // GET Addresses for User
  getUsersAddresses(user, page, per_page) {
    return this.http
      .get('user/profile/address', {
        params: {
          user,
          page,
          per_page,
        },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getAddresses(user, page, per_page) {
    return this.http.get('user/profile/address', {
      params: { user, page, per_page },
    });
  }

  addNewAddress(body) {
    return this.http.post('user/profile/address', body);
  }

  updateAddress(body) {
    return this.http.patch('user/profile/address', body);
  }

  deleteAddress(body) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body,
    };

    return this.http.delete('user/profile/address', httpOptions);
  }

  // User Email Endpoints
  getEmails(user, page, per_page) {
    return this.http.get('user/profile/email', {
      params: {
        user,
        page,
        per_page,
      },
    });
  }

  addEmail(body) {
    return this.http.post('user/profile/email', body);
  }

  updateEmail(body) {
    return this.http.patch('user/profile/email', body);
  }

  deleteEmail(body) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body,
    };
    return this.http.delete('user/profile/email', httpOptions);
  }

  // Phone Endpoints
  getPhone(user, page, per_page) {
    return this.http.get('user/profile/phone', {
      params: {
        user,
        page,
        per_page,
      },
    });
  }

  addPhone(body) {
    return this.http.post('user/profile/phone', body);
  }

  updatePhone(body) {
    return this.http.patch('user/profile/phone', body);
  }

  deletePhone(body) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body,
    };

    return this.http.delete('user/profile/phone', httpOptions);
  }

  // Groups Section
  getUsersGroups(user) {
    return this.http.get(`auth/access/user/${user}/groups`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
