import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptorService } from './default-interceptor.service';

export const httpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptorService, multi: true }];
