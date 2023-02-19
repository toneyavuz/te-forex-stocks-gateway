import { LocalAuthenticationGuard } from './../guard/local-authentication.guard';
import {
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { ApiTags } from '@nestjs/swagger';


interface IPolicyHandler {
  handle(ability: any): boolean;
}

@Controller('authentication')
@ApiTags('authentication')
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

  @Post('signup')
  signup(@Request() req) {
    return this.authenticationService.signup(req.user);
  }
}
