import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { CalculatorModule } from './module/calculator/calculator.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './service/mongoose-config.service';
import { AuthenticationModule } from './module/authentication/authentication.module';
import { UserModule } from './module/user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerConfigService } from './service/throttler-config.service';

@Module({
  imports: [
    CalculatorModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfigService,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    AuthenticationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
