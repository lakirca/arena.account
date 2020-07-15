import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderState {
  private menuList: Menu[];
  private notAuthMenuList: Menu[];

  private selected$ = new BehaviorSubject<Menu>(new Menu());

  private expand$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.menuList = [
      { title: 'Account', icon: 'fa fa-user-circle', url: 'account' },
      { title: 'Services', icon: 'fa fa-wrench', url: 'services' },
      { title: 'Accounting', icon: 'fa fa-credit-card', url: 'accounting' },
      // { title: 'Invoice', icon: 'fas fa-money-check', url: 'invoice' },
      // { title: 'Notifications', icon: 'fa fa-bell', url: 'notifications' },
      // { title: 'Settings', icon: 'fa fa-cogs', url: 'settings' },
      // { title: 'Sign Out', icon: 'fas fa-sign-out', url: 'sign-out' },
    ];

    this.notAuthMenuList = [
      { title: 'Sign In', icon: 'fas fa-sign-in-alt', url: 'sign-in' },
      { title: 'Sign Up', icon: 'fa fa-user-plus', url: 'sign-up' },
    ];
  }

  getMenuList(): Menu[] {
    return this.menuList;
  }

  getNotAuthMenuList(): Menu[] {
    return this.notAuthMenuList;
  }

  setSelect(menu: Menu) {
    this.selected$.next(menu);
  }

  getSelect$(): Observable<Menu> {
    return this.selected$.asObservable();
  }

  getExpand$(): Observable<boolean> {
    return this.expand$.asObservable();
  }

  setExpand(expand: boolean) {
    this.expand$.next(expand);
  }
}
