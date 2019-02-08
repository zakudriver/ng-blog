import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PreloadingService } from './core/services/preloading.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './modules/home/home.module#HomeModule',
        data: { title: '', preload: true }
      },
      {
        path: 'blog',
        loadChildren: './modules/blog/blog.module#BlogModule',
        data: { title: 'Blog', preload: true }
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
  },
  {
    path: '**',
    loadChildren: './modules/not-found/not-found.module#NotFoundModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadingService
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
