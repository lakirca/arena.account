import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './core/services/theme';
import { SubSink } from 'subsink';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NotificationsService } from './core/services/notifications';

@Component({
  selector: 'arena',
  templateUrl: 'app.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  theme: string = 'dusk'; // current theme (dusk or dawn)
  currentPage: any;
  pages: any[] = ['sign-in', 'sign-up', 'forgot-password', 'password-reset'];

  get page(): boolean {
    return this.pages.includes(this.currentPage);
  }

  constructor(
    private platform: Platform,
    private themeService: ThemeService,
    private notificationService: NotificationsService,
    private statusBar: StatusBar,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.initTheme();
    this.initNotification();
    this.subs.sink = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url.split('?')[0];
        this.currentPage = this.currentPage.slice(1);
        this.currentPage = this.currentPage.split('/')[0];
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  initNotification() {
    if (this.cookieService.get('access_token')) {
      this.notificationService.listen(this.cookieService.get('user'));
    }
  }

  initTheme() {
    const theme = this.cookieService.get('theme');
    if (theme) {
      if (theme === 'dusk') {
        this.themeService.setDuskTheme();
      } else {
        this.themeService.setDawnTheme();
      }
    } else {
      this.themeService.setDuskTheme();
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
