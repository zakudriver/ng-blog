import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';

import { LoggerService } from '@app/core/services/logger.service';
import { ResponseHandlerService } from '@app/core/services/response-handler.service';
import { IArticle } from '@app/interface';
import { BehaviorSubject } from 'rxjs';
import { LayoutService } from '@app/layout/layout.service';
import { HttpClientService } from '@app/core/services/http-client.service';
import { MetaService } from '@app/core/services/meta.service';

// const ARTICLE_KEY = makeStateKey<IArticle>('article');

@Injectable()
export class ArticleService {
  articleSubject = new BehaviorSubject<IArticle>({
    _id: '',
    title: 'Title',
    category: {
      name: 'category'
    },
    content: '# content'
  });

  constructor(
    private _http: HttpClientService,
    private _loggerSer: LoggerService,
    private _layoutSer: LayoutService,
    private _state: TransferState,
    private _metaSer: MetaService,
    @Inject(PLATFORM_ID) private _platformId: object
  ) {}

  getArticle(id: string) {
    this._http
      .get<IArticle>('getArticle', '/article', { _id: id })
      .pipe(
        catchError(
          ResponseHandlerService.handleErrorData<IArticle>('getArticle', {
            title: 'Error',
            category: {
              name: 'error'
            },
            content: 'error!!'
          } as IArticle)
        )
      )
      .subscribe(d => {
        this.articleSubject.next(d);
        this._layoutSer.titleHandler(d.title);
        this._layoutSer.dateHandler(d.updateTime);
        this._layoutSer.backgroundUrHandler(d.cover);

        this._metaTagHandler(d);
      });
  }

  destroy() {
    this._metaSer.rmTagEle();
  }

  private _metaTagHandler(d: IArticle) {
    this._metaSer.addTag({ name: 'keywords', content: d.title });
    this._metaSer.addTag({ name: 'description', content: d.content.substring(0, 200) });

    this._metaSer.addTag({ name: 'og:title', content: d.title });
    this._metaSer.addTag({ name: 'og:description', content: d.content.substring(0, 200) });
    this._metaSer.addTag({ name: 'og:url', content: `https://zyhua.cn/article/${d._id}` });
  }
}
