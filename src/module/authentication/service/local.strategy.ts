import { User } from '../../user/schema/user.schema';

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ValidateAuthenticationDto } from '../dto/validate-authentication.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  async validate(
    validateAuthenticationDto: ValidateAuthenticationDto,
  ): Promise<User> {
    const user = await this.authenticationService.validate(
      validateAuthenticationDto,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
