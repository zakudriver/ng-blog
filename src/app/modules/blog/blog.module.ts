import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { BlogComponent } from './blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogToolbarComponent } from './components/blog-toolbar/blog-toolbar.component';
import { BlogService } from './services/blog.service';

@NgModule({
  declarations: [BlogComponent, BlogListComponent, BlogToolbarComponent],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
  providers: [BlogService]
})
export class BlogModule {}
