import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './children/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { title: '' }
      },
      {
        path: 'blog',
        loadChildren: './children/blog/blog.module#BlogModule',
        data: { title: 'Blog' }
      },
      // {
      //   path: 'contact',
      //   loadChildren: './children/contact/contact.module#ContactModule',
      // },
      {
        path: 'article/:id',
        loadChildren: './children/article/article.module#ArticleModule',
        data: { title: 'Article' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
