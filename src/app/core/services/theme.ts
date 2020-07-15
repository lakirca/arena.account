import { Injectable } from '@angular/core';
import { Theme, dawn, dusk } from '../interfaces/Theme';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private cookieService: CookieService) {}

  private active: Theme = dusk;
  private availableTheme: Theme[] = [dawn, dusk];

  getAvailableThemes(): Theme[] {
    return this.availableTheme;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDuskTheme(): boolean {
    return this.active.name == dusk.name;
  }

  setDuskTheme(): void {
    this.cookieService.set('theme', 'dusk');
    this.setActiveTheme(dusk);
  }

  setDawnTheme(): void {
    this.cookieService.set('theme', 'dawn');
    this.setActiveTheme(dawn);
  }

  protected setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}
