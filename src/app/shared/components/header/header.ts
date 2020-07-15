import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { HeaderFacade } from 'src/app/core/facades/header.facade';
import { Menu } from 'src/app/core/models/menu';
import { ThemeService } from 'src/app/core/services/theme';
import { AuthService } from 'src/app/core/services/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/local';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  menuList: Menu[];
  cloudUrl = environment.cloudUrl;
  notAuthMenuList: Menu[];
  isExpand: boolean;
  selectedMenuItem: Menu;

  get theme() {
    return this.cookieService.get('theme');
  }

  constructor(
    public headerFacade: HeaderFacade,
    public authService: AuthService,
    private cookieService: CookieService,
    public themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subs.sink = this.headerFacade.getSelect$().subscribe((res) => {
      this.selectedMenuItem = res;
    });
    this.subs.sink = this.headerFacade.getExpand$().subscribe((res) => {
      this.isExpand = res;
    });
    this.menuList = this.headerFacade.getMenuList();
    this.notAuthMenuList = this.headerFacade.getNotAuthMenuList();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  expandMenu() {
    this.headerFacade.setExpand(!this.isExpand);
  }

  clickOutside() {
    this.headerFacade.setExpand(false);
  }

  navigate(path: string) {
    if (path === 'home') {
      if (this.authService.isAuthorized) {
        this.router.navigate([`dashboard`]);
        this.clickOutside();
      } else {
        this.router.navigate([`${path}`]);
        this.clickOutside();
      }
    } else {
      this.router.navigate([`${path}`]);
      this.clickOutside();
    }
  }

  signOut() {
    this.authService.signOut().subscribe((res) => {
      this.clickOutside();
    });
  }

  getUser() {
    this.authService.getUser().subscribe((res: any) => {
      console.log(res);
    });
  }

  selectMenuItem(menu: Menu) {
    this.navigate(menu.url);
    this.headerFacade.setSelect(menu);
  }

  isSelected(menu: Menu): boolean {
    return this.selectedMenuItem.title == menu.title;
  }

  changeTheme() {
    if (this.themeService.isDuskTheme()) {
      this.themeService.setDawnTheme();
    } else {
      this.themeService.setDuskTheme();
    }
  }
}
