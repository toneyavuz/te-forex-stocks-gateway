import { User } from '../../user/schema/user.schema';
import {
  Calculator,
  CalculatorDocument,
  CalculatorResponseModel,
  CalculatorTPTypeEnum,
} from '../schema/calculator.schema';
import { Injectable } from '@nestjs/common';
import {
  CreateCalculatorDto,
  UpdateCalculatorDto,
} from '../dto/create-calculator.dto';
import { CalculatorTPModel } from '../schema/calculator.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectModel(Calculator.name)
    private calculatorModel: mongoose.Model<CalculatorDocument>,
  ) {}

  async create(
    createCalculatorDto: CreateCalculatorDto,
    user: User,
  ): Promise<CalculatorResponseModel> {
    const tpList = this.getCalculatorResponse(createCalculatorDto);
    tpList.calculator = await this.calculatorModel.create({
      user: {_id: user._id},
      ...createCalculatorDto});

    return tpList;
  }

  async findAll(options: any = {}): Promise<Calculator[]> {
    const limit = options.limit || 10;
    const skip = options.skip || 0;
    const keyword = options.keyword || '';
    return await this.calculatorModel.find({
      where: { name: { $regex: '.*' + keyword + '.*' } },
      order: { name: 'DESC' },
    }).skip(skip).limit(limit).exec();
  }

  async findOne(id: mongoose.ObjectId): Promise<Calculator> {
    const calculator = await this.calculatorModel.findOne({ _id: id }).exec();
    return calculator;
  }

  async update(
    id: mongoose.ObjectId,
    updateCalculatorDto: UpdateCalculatorDto,
  ): Promise<CalculatorResponseModel> {
    delete updateCalculatorDto.id;
    const calculator = await this.calculatorModel.findByIdAndUpdate(
      id,
      updateCalculatorDto,
    );
    const tpList: CalculatorResponseModel =
      this.getCalculatorResponse(calculator);
    tpList.calculator = calculator;
    return tpList;
  }

  async remove(id: mongoose.ObjectId): Promise<Calculator> {
    const deletedCalculator = await this.calculatorModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCalculator;
  }

  getCalculatorResponse(
    calculatorDto: UpdateCalculatorDto,
  ): CalculatorResponseModel {
    const tpList: CalculatorResponseModel = calculatorDto.lots.reduce(
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
      calculatorDto.buyPrice -
        (calculatorDto.buyTotalCash -
          calculatorDto.buyCollateral * calculatorDto.buyLiquidation) /
          allLot +
        calculatorDto.buySpread,
    );
    tpList.sell[0].tp = Math.floor(
      calculatorDto.sellPrice +
        (calculatorDto.sellTotalCash -
          calculatorDto.sellCollateral * calculatorDto.sellLiquidation) /
          allLot -
        calculatorDto.sellSpread,
    );

    let remainingLot = allLot - +tpList.buy[0].lotValue;

    for (let i = 1; i < tpList.buy.length; i++) {
      // buy
      const d = calculatorDto.buyCollateral / (allLot * 10);
      const e = tpList.buy[i - 1].lotValue * 10;
      tpList.buy[i].tp =
        tpList.buy[i - 1].tp -
        Math.floor((d * e * calculatorDto.buyLiquidation) / remainingLot);

      // sell
      const f = calculatorDto.sellCollateral / (allLot * 10);
      const g = tpList.sell[i - 1].lotValue * 10;
      tpList.sell[i].tp =
        tpList.sell[i - 1].tp +
        Math.floor((f * g * calculatorDto.sellLiquidation) / remainingLot);

      // calculate remaining lot
      remainingLot -= +tpList.buy[i].lotValue;
    }

    return tpList;
  }
}
