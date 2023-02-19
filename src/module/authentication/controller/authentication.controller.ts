import { LocalAuthenticationGuard } from './../guard/local-authentication.guard';
import {
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';

@Controller('authentication')
export class AuthenticationController {

  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {

  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  validate(@Request() req) {
    return this.authenticationService.login(req.user);
  }
}
