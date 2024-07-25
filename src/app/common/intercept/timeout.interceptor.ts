import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(_: unknown, next: CallHandler): Observable<unknown> {
    // return next.handle().pipe(
    //   timeout(60 * 5 * 1000),
    //   catchError((err) => {
    //     if (err instanceof TimeoutError) {
    //       return throwError(() => new RequestTimeoutException());
    //     }
    //     return throwError(() => err);
    //   })
    // );
    return next.handle();
  }
}
