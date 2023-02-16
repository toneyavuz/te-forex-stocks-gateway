import {
  Calculator,
  CalculatorDocument,
  CalculatorResponseModel,
  CalculatorTPTypeEnum,
} from '../schema/calculator.schema';
import { Injectable } from '@nestjs/common';
import { CreateCalculatorDto, UpdateCalculatorDto } from '../dto/create-calculator.dto';
import { CalculatorTPModel } from '../schema/calculator.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectModel(Calculator.name) private calculatorModel: Model<CalculatorDocument>,
  ) {}

  async create(createCalculatorDto: CreateCalculatorDto): Promise<CalculatorResponseModel> {
    const tpList: CalculatorResponseModel = createCalculatorDto.lots.reduce(
      (tp, item) => {
        for (let i = 0; i < item.count; i++) {
          tp.buy.push(<CalculatorTPModel>{
            lotValue: item.value,
            type: CalculatorTPTypeEnum.buy,
          });
          tp.sell.push(<CalculatorTPModel>{
            lotValue: item.value,
            type: CalculatorTPTypeEnum.sell,
          });
        }
        return tp;
      },
      { buy: <CalculatorTPModel[]>[], sell: <CalculatorTPModel[]>[] },
    );
    const allLot = +tpList.buy
      .reduce((total, item) => total + item.lotValue, 0)
      .toFixed(0);
    tpList.buy[0].tp = Math.floor(
      createCalculatorDto.buyPrice -
        (createCalculatorDto.buyTotalCash -
          createCalculatorDto.buyCollateral *
            createCalculatorDto.buyLiquidation) /
          allLot +
        createCalculatorDto.buySpread,
    );
    tpList.sell[0].tp = Math.floor(
      createCalculatorDto.sellPrice +
        (createCalculatorDto.sellTotalCash -
          createCalculatorDto.sellCollateral *
            createCalculatorDto.sellLiquidation) /
          allLot -
        createCalculatorDto.sellSpread,
    );

    let remainingLot = allLot - +tpList.buy[0].lotValue;

    for (let i = 1; i < tpList.buy.length; i++) {
      // buy
      const d = createCalculatorDto.buyCollateral / (allLot * 10);
      const e = tpList.buy[i - 1].lotValue * 10;
      tpList.buy[i].tp =
        tpList.buy[i - 1].tp -
        Math.floor((d * e * createCalculatorDto.buyLiquidation) / remainingLot);

      // sell
      const f = createCalculatorDto.sellCollateral / (allLot * 10);
      const g = tpList.sell[i - 1].lotValue * 10;
      tpList.sell[i].tp =
        tpList.sell[i - 1].tp +
        Math.floor(
          (f * g * createCalculatorDto.sellLiquidation) / remainingLot,
        );

      // calculate remaining lot
      remainingLot -= +tpList.buy[i].lotValue;
    }

    tpList.calculator = await this.calculatorModel.create(createCalculatorDto);

    return tpList;
  }

  findAll() {
    return `This action returns all calculator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calculator`;
  }

  update(id: number, updateCalculatorDto: UpdateCalculatorDto) {
    return `This action updates a #${id} calculator`;
  }

  remove(id: number) {
    return `This action removes a #${id} calculator`;
  }
}
