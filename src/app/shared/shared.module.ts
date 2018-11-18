import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './modules/material.module';
import { CoreModule } from '@app/core/core.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { ScrollDirective } from './directives/scroll/scroll.directive';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, CoreModule],
  declarations: [HeaderComponent, FooterComponent, BannerComponent, ScrollDirective],
  exports: [HeaderComponent, FooterComponent, BannerComponent, MaterialModule, ScrollDirective]
})
export class SharedModule {}
