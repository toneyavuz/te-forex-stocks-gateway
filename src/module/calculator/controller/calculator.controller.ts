import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CalculatorService } from '../service/calculator.service';
import { CreateCalculatorDto, UpdateCalculatorDto } from '../dto/create-calculator.dto';
import { CalculatorResponseModel } from '../schema/calculator.schema';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../../authentication/guard/jwt-authentication.guard';
import * as mongoose from 'mongoose';

@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
@Controller('calculator')
@ApiTags('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {
  }

  @Post()
  create(@Body() createCalculatorDto: CreateCalculatorDto, @Request() req): Promise<CalculatorResponseModel> {
    return this.calculatorService.create(createCalculatorDto, req.user);
  }

  @Get()
  findAll() {
    return this.calculatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.ObjectId) {
    return this.calculatorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.ObjectId, @Body() updateCalculatorDto: UpdateCalculatorDto) {
    return this.calculatorService.update(id, updateCalculatorDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'id of the calculator to delete'})
  remove(@Param('id') id: mongoose.ObjectId) {
    return this.calculatorService.remove(id);
  }
}
