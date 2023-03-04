import { CreateUserDto } from './../../user/dto/create-user.dto';
import { LocalAuthenticationGuard } from './../guard/local-authentication.guard';
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorator/public.decorator';
import { ValidateAuthenticationDto } from '../dto/validate-authentication.dto';


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

  @Public()
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  login(@Body() v: ValidateAuthenticationDto, @Request() req) {
    console.log(v);
    return this.authenticationService.login(req.user);
  }

  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.register(createUserDto);
  }
}
