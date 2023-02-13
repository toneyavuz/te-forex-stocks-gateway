import { LotEntity } from '../entities/lot.entity';

export class CreateCalculatorDto {
  lots: LotEntity[] | string;
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
