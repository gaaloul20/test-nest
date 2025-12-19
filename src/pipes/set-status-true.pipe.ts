import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SetStatusTruePipe implements PipeTransform<unknown, unknown> {
  transform(value: unknown): unknown {
    if (value && typeof value === 'object') {
      return {
        ...(value as Record<string, unknown>),
        statut: true,
      };
    }
    return value;
  }
}
