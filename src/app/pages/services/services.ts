import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SubSink } from 'subsink';
import { environment } from 'src/environments/local';
import { BehaviorSubject, Observable } from 'rxjs';
import { SoundblockService } from 'src/app/core/services/soundblock';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
  styleUrls: ['./services.scss'],
})
export class ServicesPage {
  private subs = new SubSink();
  cloudUrl: string = environment.cloudUrl;
  userId: any;
  searchText: string;

  servicesSubject: BehaviorSubject<any[]> = new BehaviorSubject(null);
  get services$(): Observable<any[]> {
    return this.servicesSubject.asObservable();
  }

  constructor(
    private soundblockService: SoundblockService,
    private cookieService: CookieService
  ) {}

  ionViewDidEnter() {
    this.userId = this.cookieService.get('user');

    this.getServices();
  }

  getServices() {
    this.subs.sink = this.soundblockService
      .getUsersServices(this.userId)
      .subscribe(
        (res: any) => {
          console.log('Services: ', res);

          this.servicesSubject.next(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  ionViewDidLeave() {
    this.servicesSubject.next(null);

    this.subs.unsubscribe();
  }
}
