import { UserExportModule } from './../user/user.module';
import { UserService } from './../user/service/user.service';
import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './service/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './service/local.strategy';

@Module({
  imports: [PassportModule, UserExportModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, LocalStrategy],
})
export class AuthenticationModule {}
