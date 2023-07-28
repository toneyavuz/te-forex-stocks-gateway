import { Module } from '@nestjs/common';
import { CalculatorService } from './service/calculator.service';
import { CalculatorController } from './controller/calculator.controller';
import { Calculator, CalculatorSchema } from './schema/calculator.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calculator.name, schema: CalculatorSchema },
    ]),
  ],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
