import { User, UserSchema } from './../../user/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';

@Schema({ collection: 'calculator', timestamps: true })
export class Calculator extends mongoose.Document {
  @Prop({ auto: true })
  _id!: mongoose.Schema.Types.ObjectId;

  @Prop()
  @Type(() => LotModel)
  lots: LotModel[];

  @Prop()
  name: string;

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

  // owner
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User;
}

export type CalculatorDocument = mongoose.HydratedDocument<Calculator>;
export const CalculatorSchema = SchemaFactory.createForClass(Calculator);

export class LotModel {
  @ApiProperty({ default: 1 }) count: number;
  @ApiProperty({ default: 0.5 }) value: number;
}

export enum CalculatorTPTypeEnum {
  buy = 'buy',
  sell = 'sell',
}

export class CalculatorTPModel {
  @ApiProperty() lotValue: number;
  @ApiProperty() tp: number;
  @ApiProperty({ enum: CalculatorTPTypeEnum }) type: CalculatorTPTypeEnum;
}

export class CalculatorResponseModel {
  @ApiProperty({ isArray: true, type: CalculatorTPModel })
  buy: CalculatorTPModel[];
  @ApiProperty({ isArray: true, type: CalculatorTPModel })
  sell: CalculatorTPModel[];
  calculator?: Calculator;
}
