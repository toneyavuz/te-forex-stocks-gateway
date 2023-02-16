import { ValidateAuthenticationDto } from './../dto/validate-authentication.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  validate(@Body() createAuthenticationDto: ValidateAuthenticationDto) {
    return this.authenticationService.validate(createAuthenticationDto);
  }
}
