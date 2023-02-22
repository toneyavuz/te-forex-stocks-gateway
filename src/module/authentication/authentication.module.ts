import { Authority, AuthoritySchema } from './schema/authority.schema';
import { JwtStrategy } from './service/jwt.strategy';
import { UserExportModule } from './../user/user.module';
import { UserService } from './../user/service/user.service';
import { Module, OnModuleInit } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './service/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './service/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from './service/jwt-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schema/role.schema';
import { AuthorityService } from './service/authority.service';
import { RoleService } from './service/role.service';

@Module({
  imports: [
    PassportModule,
    UserExportModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Authority.name, schema: AuthoritySchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UserService,
    LocalStrategy,
    AuthorityService,
    RoleService,
    JwtStrategy,
  ],
})
export class AuthenticationModule implements OnModuleInit {
  constructor(
    private readonly authorityService: AuthorityService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const authorities = await this.authorityService.init();
    const role = await this.roleService.init(authorities);
    await this.userService.init(role);
  }
}
