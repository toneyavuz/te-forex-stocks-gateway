import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/service/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateAuthenticationDto } from '../dto/validate-authentication.dto';
import { User } from '../../user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async validate(
    validateAuthenticationDto: ValidateAuthenticationDto,
  ): Promise<User> {
    const user = await this.userService.validate(validateAuthenticationDto);

    if (!user) throw new UnauthorizedException();
    return user;
  }

  async login(user: User) {
    console.log('user', user);
    const payload = {
      username: user.username,
      email: user.email,
      roles: user.roles,
      status: user.status,
      _id: user._id,
    } as User;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }

  async register(user: User) {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
}
