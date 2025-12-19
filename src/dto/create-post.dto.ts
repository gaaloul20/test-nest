/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotInPast', async: false })
export class IsNotInPastConstraint implements ValidatorConstraintInterface {
  validate(value: Date): boolean {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      return false;
    }
    const now = new Date();
    return value.getTime() >= now.getTime();
  }

  defaultMessage(): string {
    return 'createdAt must be greater than or equal to now';
  }
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @Type(() => Date)
  @IsDate()
  @Validate(IsNotInPastConstraint)
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsOptional()
  @IsBoolean()
  statut?: boolean;
}
