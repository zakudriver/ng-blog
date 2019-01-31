import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, appConfig } from '@app/config/app.config';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { AppService } from './modules/app.service';
import { HomeComponent } from './modules/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BannerComponent } from './layout/banner/banner.component';
import { BlogService } from './modules/blog/services/blog.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, LayoutComponent, HeaderComponent, FooterComponent, BannerComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_CONFIG, useValue: appConfig }, AppService, BlogService]
})
export class AppModule {}
