import { LotModel } from '../schema/calculator.schema';

export class CreateCalculatorDto {
  lots: LotModel[] | string;
  name: string;
  fee?: number;
  buyTotalCash?: number;
  sellTotalCash?: number;
  buyCollateral?: number;
  sellCollateral?: number;
  buyPrice?: number;
  sellPrice?: number;
  buySpread?: number;
  sellSpread?: number;
  buyLiquidation?: number;
  sellLiquidation?: number;
}
