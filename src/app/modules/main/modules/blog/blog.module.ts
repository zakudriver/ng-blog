import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

@NgModule({
  declarations: [BlogComponent, ArticleListComponent],
  imports: [CommonModule],
  exports: []
})
export class BlogModule {}
