import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [MaterialModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent, MaterialModule]
})
export class SharedModule {}
