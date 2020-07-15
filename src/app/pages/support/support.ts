import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { SupportService } from 'src/app/core/services/support';

@Component({
  selector: 'app-support',
  templateUrl: './support.html',
  styleUrls: ['./support.scss'],
})
export class SupportPage implements OnInit {
  private subs = new SubSink();

  constructor(private supportService: SupportService) {}

  ngOnInit() {
    this.getTickets()
  }

  getTickets() {
    this.subs.sink = this.supportService.getTickets().subscribe((res: any) => {
      console.log('Tickets: ', res);
    });
  }
}
