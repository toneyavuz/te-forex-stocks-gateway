import { Module } from '@nestjs/common';
import { CalculatorService } from './service/calculator.service';
import { CalculatorController } from './controller/calculator.controller';

@Module({
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {
}
