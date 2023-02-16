import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  count: number;
  value: number;
}

export class CalculatorTPModel {
  lotValue: number;
  tp: number;
  type: 'buy' | 'sell';
}

export class CalculatorResponseModel {
  buy: CalculatorTPModel[];
  sell: CalculatorTPModel[];
}
