import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '@app/shared/shared.module';
import { HomeComponent } from './modules/home/home.component';

@NgModule({
  declarations: [MainComponent, HomeComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule]
})
export class MainModule {}
