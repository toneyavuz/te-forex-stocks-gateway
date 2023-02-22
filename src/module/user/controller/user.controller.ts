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
import { JwtAuthenticationGuard } from '../../authentication/guard/jwt-authentication.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { User } from '../decorator/user.decorator';

@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('info')
  info(@Request() req) {
    return req.user;
  }

  @Get('all')
  findAll(@User() user: any) {
    console.log('User decorator: ', user);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.ObjectId) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.ObjectId) {
    return this.userService.remove(id);
  }
}
