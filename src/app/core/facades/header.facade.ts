import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderState } from '../states/header.state';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class HeaderFacade {

  constructor(private headerState: HeaderState) { }

  setSelect(menu: Menu) {
    this.headerState.setSelect(menu);
  }

  getSelect$(): Observable<Menu> {
    return this.headerState.getSelect$();
  }

  getMenuList(): Menu[] {
    return this.headerState.getMenuList();
  }

  getNotAuthMenuList(): Menu[] {
    return this.headerState.getNotAuthMenuList();
  }

  getExpand$(): Observable<boolean> {
    return this.headerState.getExpand$();
  }

  setExpand(expand: boolean) {
    this.headerState.setExpand(expand);
  }
}
