import { Injectable } from '@nestjs/common';
import { CreateCalculatorDto } from '../dto/create-calculator.dto';
import { UpdateCalculatorDto } from '../dto/update-calculator.dto';
import { CalculatorTPEntity } from '../entities/calculator-tp.entity';

@Injectable()
export class CalculatorService {
  create(createCalculatorDto: CreateCalculatorDto) {
    createCalculatorDto.fee = +createCalculatorDto.fee;
    createCalculatorDto.buyTotalCash = +createCalculatorDto.buyTotalCash;
    createCalculatorDto.sellTotalCash = +createCalculatorDto.sellTotalCash;
    createCalculatorDto.buyCollateral = +createCalculatorDto.buyCollateral;
    createCalculatorDto.sellCollateral = +createCalculatorDto.sellCollateral;
    createCalculatorDto.buyPrice = +createCalculatorDto.buyPrice;
    createCalculatorDto.sellPrice = +createCalculatorDto.sellPrice;
    createCalculatorDto.buySpread = +createCalculatorDto.buySpread;
    createCalculatorDto.sellSpread = +createCalculatorDto.sellSpread;
    createCalculatorDto.buyLiquidation = +createCalculatorDto.buyLiquidation;
    createCalculatorDto.sellLiquidation = +createCalculatorDto.sellLiquidation;
    const tpList: {
      buy: CalculatorTPEntity[];
      sell: CalculatorTPEntity[];
    } = JSON.parse(createCalculatorDto.lots.toString()).reduce(
      (tp, item) => {
        for (let i = 0; i < item.count; i++) {
          tp.buy.push(<CalculatorTPEntity>{
            lotValue: item.value,
            type: 'buy',
          });
          tp.sell.push(<CalculatorTPEntity>{
            lotValue: item.value,
            type: 'sell',
          });
        }
        return tp;
      },
      { buy: <CalculatorTPEntity[]>[], sell: <CalculatorTPEntity[]>[] },
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
