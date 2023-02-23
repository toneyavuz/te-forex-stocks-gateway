import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  email?: string;

  roles?: string[];
}

class AdditionalUpdate {
  @ApiProperty() id: string;
}

export class UpdateUserDto extends PartialType(
  IntersectionType(CreateUserDto, AdditionalUpdate),
) {}
