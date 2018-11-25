import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, appConfig } from '@app/config/app.config';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, AppRoutingModule, CoreModule],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_CONFIG, useValue: appConfig }]
})
export class AppModule {}
