import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReplyComponent } from './components/reply/reply.component';

@NgModule({
  declarations: [ArticleComponent, ReplyComponent],
  imports: [CommonModule, ArticleRoutingModule, SharedModule]
})
export class ArticleModule {}
