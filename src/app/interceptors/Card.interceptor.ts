import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// import 'rxjs/add/operator/do';

@Injectable()
export class CardInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      debounceTime(500),
      evt => {
        console.log('load data');
        return evt;
      })

  }
}