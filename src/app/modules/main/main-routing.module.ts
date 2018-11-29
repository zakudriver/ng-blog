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
        component: HomeComponent
      },
      {
        path: 'blog',
        loadChildren: './children/blog/blog.module#BlogModule'
      },
      {
        path: 'contact',
        loadChildren: './children/contact/contact.module#ContactModule'
      },
      {
        path: 'article',
        loadChildren: './children/article/article.module#ArticleModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
