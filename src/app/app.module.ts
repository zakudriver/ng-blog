import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, appConfig } from '@app/config/app.config';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { AppService } from './modules/app.service';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BannerComponent } from './layout/banner/banner.component';
import { LayoutService } from './layout/layout.service';
import { PreloadingService } from './core/services/preloading.service';

@NgModule({
  declarations: [AppComponent, LayoutComponent, HeaderComponent, FooterComponent, BannerComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_CONFIG, useValue: appConfig }, PreloadingService, AppService, LayoutService]
})
export class AppModule {}
