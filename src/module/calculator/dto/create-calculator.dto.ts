import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { LotModel } from '../schema/calculator.schema';

export class CreateCalculatorDto {
  @ApiProperty({ isArray: true, type: LotModel })
  @IsNotEmpty()
  lots: LotModel[];
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  fee: number;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  buyTotalCash: number;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  sellTotalCash: number;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  buyCollateral: number;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  sellCollateral: number;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  buyPrice: number;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  sellPrice: number;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  buySpread: number;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  sellSpread: number;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  buyLiquidation: number;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  sellLiquidation: number;
}

class AdditionalUpdate {
  @ApiProperty() id: string;
}

export class UpdateCalculatorDto extends PartialType(
  IntersectionType(CreateCalculatorDto, AdditionalUpdate)
) {}
