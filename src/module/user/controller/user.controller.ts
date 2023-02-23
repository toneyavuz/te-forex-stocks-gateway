import { AuthorityEnum } from './../../authentication/enum/authority.enum';
import {
  Authorities,
  AuthorityWithActions,
} from './../../authentication/decorator/authority.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { User } from '../decorator/user.decorator';
import { AuthorityActionEnum } from 'src/module/authentication/enum/authority-action.enum';

@ApiBearerAuth()
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorities(
    AuthorityWithActions(AuthorityEnum.USER, AuthorityActionEnum.CREATE),
  )
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Authorities(
    AuthorityWithActions(AuthorityEnum.USER, AuthorityActionEnum.READ),
  )
  @Get('info')
  info(@Request() req) {
    return req.user;
  }

  @Authorities(
    AuthorityWithActions(AuthorityEnum.USER, AuthorityActionEnum.READ),
  )
  @Get('all')
  findAll(@User() user: any) {
    console.log('User decorator: ', user);
    return this.userService.findAll();
  }

  @Authorities(
    AuthorityWithActions(AuthorityEnum.USER, AuthorityActionEnum.READ),
  )
  @Get(':id')
  findOne(@Param('id') id: mongoose.ObjectId) {
    return this.userService.findOneById(id);
  }

  @Authorities(
    AuthorityWithActions(AuthorityEnum.USER, AuthorityActionEnum.UPDATE),
  )
  @Patch(':id')
  update(
    @Param('id') id: mongoose.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Authorities(
    AuthorityWithActions(AuthorityEnum.USER, AuthorityActionEnum.DELETE),
  )
  @Delete(':id')
  remove(@Param('id') id: mongoose.ObjectId) {
    return this.userService.remove(id);
  }
}
