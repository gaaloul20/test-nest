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
import { IsNotInPastConstraint } from './create-post.dto';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Validate(IsNotInPastConstraint)
  createdAt?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsBoolean()
  statut?: boolean;
}
