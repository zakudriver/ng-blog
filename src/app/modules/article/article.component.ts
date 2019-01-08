import { Component, OnInit } from '@angular/core';
import { ArticleService } from './serives/article.service';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from '@app/interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.styl']
})
export class ArticleComponent implements OnInit {
  content = '# content';
  category: { name: string } = { name: 'category' };
  id: string;

  constructor(private _router: ActivatedRoute, private _articleService: ArticleService) {}

  ngOnInit() {
    const id = this._router.snapshot.paramMap.get('id');
    this._articleService.getArticle(id);

    this._articleService.articleSubject.subscribe(d => {
      const { content, category } = d;
      this.content = content;
      this.category = category;
      this.id = d._id;
    });
  }
}
