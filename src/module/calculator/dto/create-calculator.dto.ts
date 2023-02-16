import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { LotModel } from '../schema/calculator.schema';

export class CreateCalculatorDto {
  @ApiProperty({ required: false }) id?: string;
  @ApiProperty({ isArray: true, type: LotModel }) lots: LotModel[];
  @ApiProperty() name: string;
  @ApiProperty() fee: number;
  @ApiProperty() buyTotalCash: number;
  @ApiProperty() sellTotalCash: number;
  @ApiProperty() buyCollateral: number;
  @ApiProperty() sellCollateral: number;
  @ApiProperty() buyPrice: number;
  @ApiProperty() sellPrice: number;
  @ApiProperty() buySpread: number;
  @ApiProperty() sellSpread: number;
  @ApiProperty() buyLiquidation: number;
  @ApiProperty() sellLiquidation: number;
}

export class UpdateCalculatorDto extends PartialType(CreateCalculatorDto) {}
