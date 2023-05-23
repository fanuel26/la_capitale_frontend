import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable()
export class ConfigInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('http://api-tggrossiste.gescapro.net/api')) {
      if (localStorage.getItem('tokenGescapro')) {
        request = request.clone({
          headers: request.headers.set(
            'Authorization',
            `${localStorage.getItem('tokenGescapro')}`
          ),
        });
      }
    } else {
      if (localStorage.getItem('token')) {
        request = request.clone({
          headers: request.headers.set(
            'Authorization',
            `${localStorage.getItem('token')}`
          ),
        });
      }
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log("event ---->>", event);
        }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        let data = {};

        data = {
          reason:
            (error && error.error ? error.error : '') +
            ' - ' +
            (error && error.message ? error.message : ''),
          status: error.status,
        };
        if (error.status == 500) {
          // this.sweetAlertService.showErrorAlert(
          //   "Warning !",
          //   "une erreur s'est produite , nous vous reviendrons plus tard "
          // );
        }

        // console.log("data: ", data);
        return throwError(() => error);
      })
    );
  }
}
