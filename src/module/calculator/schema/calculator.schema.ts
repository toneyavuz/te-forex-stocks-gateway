import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';


@Schema()
export class Calculator {
  @Prop()
  fee: number;

  @Prop()
  buyTotalCash: number;

  @Prop()
  sellTotalCash: number;

  @Prop()
  buyCollateral: number;

  @Prop()
  sellCollateral: number;

  @Prop()
  buyPrice: number;

  @Prop()
  sellPrice: number;

  @Prop()
  buySpread: number;

  @Prop()
  sellSpread: number;

  @Prop()
  buyLiquidation: number;

  @Prop()
  sellLiquidation: number;
}

export type CalculatorDocument = HydratedDocument<Calculator>;
export const CalculatorSchema = SchemaFactory.createForClass(Calculator);


export class LotModel {
  @ApiProperty({default: 1}) count: number;
  @ApiProperty({default: 0.5}) value: number;
}

export enum CalculatorTPTypeEnum {
  buy = 'buy',
  sell = 'sell',
}

export class CalculatorTPModel {
  @ApiProperty() lotValue: number;
  @ApiProperty() tp: number;
  @ApiProperty({enum: CalculatorTPTypeEnum}) type: CalculatorTPTypeEnum;
}

export class CalculatorResponseModel {
  @ApiProperty({isArray: true, type: CalculatorTPModel}) buy: CalculatorTPModel[];
  @ApiProperty({isArray: true, type: CalculatorTPModel}) sell: CalculatorTPModel[];
  calculator?: Calculator;
}
