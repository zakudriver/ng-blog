import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule as MdModule, MarkedOptions } from 'ngx-markdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MdModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false
        }
      }
    })
  ],
  exports: [MdModule]
})
export class MarkdownModule {}
