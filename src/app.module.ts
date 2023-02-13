import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { CalculatorModule } from './module/calculator/calculator.module';

@Module({
  imports: [CalculatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
