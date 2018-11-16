import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule]
})
export class CoreModule {}
