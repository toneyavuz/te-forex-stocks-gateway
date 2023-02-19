import { LocalAuthenticationGuard } from './../guard/local-authentication.guard';
import {
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('authentication')
export class AuthenticationController {
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  validate(@Request() req) {
    return req.user;
  }
}
