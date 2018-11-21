import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

@NgModule({
  declarations: [BlogComponent, ArticleListComponent],
  imports: [CommonModule, BlogRoutingModule, SharedModule]
})
export class BlogModule {}
