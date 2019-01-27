import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReplyComponent } from './components/reply/reply.component';
import { ShareComponent } from './components/share/share.component';
import { ArticleService } from './serives/article.service';

@NgModule({
  declarations: [ArticleComponent, ReplyComponent, ShareComponent],
  imports: [CommonModule, ArticleRoutingModule, SharedModule],
  providers: [ArticleService]
})
export class ArticleModule {}
