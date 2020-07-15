import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { SoundblockService } from 'src/app/core/services/soundblock';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.html',
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
  styleUrls: ['./service-info.scss'],
})
export class ServiceInfoComponent implements OnInit {
  private subs = new SubSink();
  userId: any;
  canCancel: boolean;

  private serviceSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  get service$(): Observable<any> {
    return this.serviceSubject.asObservable();
  }

  constructor(
    private soundblockService: SoundblockService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.userId = this.cookieService.get('user');
    this.activatedRoute.params.subscribe((params: any) => {
      this.getServiceInfo(params.id);
      this.getTransactions(params.id);
      this.getServiceType(params.id);
      this.getOwner(params.id);
    });
  }

  getServiceInfo(id) {
    this.subs.sink = this.soundblockService
      .getUsersService(id)
      .subscribe((res: any) => {
        console.log('Service: ', res);

        this.serviceSubject.next(res);
      });
  }

  getServiceType(id) {
    this.subs.sink = this.soundblockService
      .getServicePlan(id)
      .subscribe((res: any) => {
        console.log('Type: ', res);
      });
  }

  getTransactions(id) {
    this.subs.sink = this.soundblockService
      .getTransactions(id)
      .subscribe((res: any) => {
        console.log('Transactions: ', res);
      });
  }

  getOwner(id) {
    this.subs.sink = this.soundblockService
      .getServiceOwner(id)
      .subscribe((res: any) => {
        console.log('Owner: ', res);
      });
  }

  unsubscribeFromService() {
    this.subs.sink = this.soundblockService
      .unsubscribeSection(this.serviceSubject.value.service_uuid)
      .subscribe((res: any) => {
        console.log('Unsubscribe: ', res);
      });
  }
}
