import { JwtStrategy } from './service/jwt.strategy';
import { UserExportModule } from './../user/user.module';
import { UserService } from './../user/service/user.service';
import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './service/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './service/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from './service/jwt-config.service';

@Module({
  imports: [
    PassportModule,
    UserExportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}
