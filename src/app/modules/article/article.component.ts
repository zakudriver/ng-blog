import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from './serives/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.styl']
})
export class ArticleComponent implements OnInit,OnDestroy {
  constructor(private _router: ActivatedRoute, public articleSer: ArticleService) {}

  ngOnInit() {
    const id = this._router.snapshot.paramMap.get('id');
    this.articleSer.getArticle(id);
  }

  ngOnDestroy(): void {
    this.articleSer.destroy();    
  }
}
