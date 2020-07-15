import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/local';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

const PUSHER_API_KEY = 'f88dc86a3f701150b191';
const PUSHER_CLUSTER = 'us2';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  echo: Echo;
  user: any;

  perPage = 5;
  playSound = false;
  toastPosition = 'top-right';

  toastPositions = [
    'top-left',
    'top-middle',
    'top-right',
    'middle-left',
    'middle-middle',
    'middle-right',
    'bottom-left',
    'bottom-middle',
    'bottom-right',
  ];
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  testServer() {
    return this.http.get<any>(`status/ping`).pipe(
      map((res) => {
        console.log('ping', res);
        return res;
      })
    );
  }
  // Notifications

  getNotifications(page) {
    return this.http
      .get<any>(`user/notifications?per_page=${this.perPage}&page=${page}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  archiveNotification(notifications) {
    const req = { notifications };
    return this.http.patch<any>(`user/notifications/archive`, req).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  deleteNotification(notifications) {
    let params = new HttpParams();
    for (let i = 0; i < notifications.length; i++) {
      params = params.append(`notifications[${i}]`, notifications[i]);
    }
    return this.http
      .delete<any>(`user/notifications`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  readNotification(notification) {
    return this.http
      .patch<any>(`user/notification/${notification}/read`, {})
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  getNotificationSetting() {
    return this.http.get<any>(`user/notification/setting`).pipe(
      map((res) => {
        const data = res.data;
        return data;
      })
    );
  }

  saveNotificationSetting(settings) {
    return this.http.patch<any>(`user/notification/setting`, settings).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  sendNotification() {
    return this.http.get<any>(`user/notification/send`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // Noteable events

  getNoteableEvents() {
    return this.http.get<any>(`soundblock/noteable`).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  // Listen & Show Toast
  listen(user) {
    this.user = user;

    const pusher = new Pusher(PUSHER_API_KEY, {
      authEndpoint: `${environment.apiUrl}broadcasting/auth`,
      cluster: PUSHER_CLUSTER,
      forceTLS: true,
      encrypted: true,
      auth: {
        params: {},
        headers: {
          Authorization: `Bearer ${this.cookieService.get('access_token')}`,
        },
      },
    });
    const channel = pusher.subscribe(
      'private-channel.app.account.user.' + user
    );
    channel.bind('Notify.User.' + user, (data) => {
      console.log(data);
    });
  }

  leaveChannel() {
    this.echo.leaveChannel(`private-channel.app.account.user.${this.user}`);
  }
}
