import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '@app/config/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.styl']
})
export class FooterComponent implements OnInit {
  router;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    this.router = config.router;
  }

  ngOnInit() {}
}
