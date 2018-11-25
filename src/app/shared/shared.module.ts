import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module';
import { APP_CONFIG, appConfig } from '@app/config/app.config';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BlackboxDirective } from './directives/blackbox/blackbox.directive';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  declarations: [HeaderComponent, FooterComponent, BannerComponent, ToolbarComponent, BlackboxDirective, SearchComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ToolbarComponent,
    BlackboxDirective,
    SearchComponent,
    MaterialModule
  ],
  // providers: [{ provide: APP_CONFIG, useValue: appConfig }]
})
export class SharedModule {}
