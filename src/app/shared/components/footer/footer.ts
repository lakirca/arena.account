import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/local';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class FooterComponent implements OnInit {
  cloudUrl: any = environment.cloudUrl;

  constructor() {}

  ngOnInit() {}
}
