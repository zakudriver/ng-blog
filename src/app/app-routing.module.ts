import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from '@app/modules/home/home.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { title: '' }
      },
      {
        path: 'blog',
        loadChildren: './modules/blog/blog.module#BlogModule',
        data: { title: 'Blog' }
      },
      // {
      //   path: 'contact',
      //   loadChildren: './modules/contact/contact.module#ContactModule',
      // },
      {
        path: 'article/:id',
        loadChildren: './modules/article/article.module#ArticleModule',
        data: { title: '' }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
