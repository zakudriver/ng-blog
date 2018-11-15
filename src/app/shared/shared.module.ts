import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [MaterialModule],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent, MaterialModule]
})
export class SharedModule {}
