import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StatusResponseInterceptor
  implements NestInterceptor<unknown, unknown> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => {
        const transformPost = (post: unknown): unknown => {
          if (post && typeof post === 'object') {
            const typedPost = post as { statut?: unknown; title?: unknown };
            if (typedPost.statut === true) {
              return typedPost;
            }
            return { title: typedPost.title };
          }
          return post;
        };

        if (Array.isArray(data)) {
          return data.map((item) => transformPost(item));
        }

        return transformPost(data);
      }),
    );
  }
}


