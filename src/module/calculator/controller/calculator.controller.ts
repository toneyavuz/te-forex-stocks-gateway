import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CalculatorService } from '../service/calculator.service';
import { CreateCalculatorDto, UpdateCalculatorDto } from '../dto/create-calculator.dto';
import { CalculatorResponseModel } from '../schema/calculator.schema';
import { ObjectId } from 'mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../../authentication/guard/jwt-authentication.guard';

@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {
  }

  @Post()
  create(@Body() createCalculatorDto: CreateCalculatorDto): Promise<CalculatorResponseModel> {
    return this.calculatorService.create(createCalculatorDto);
  }

  @Get()
  findAll() {
    return this.calculatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.calculatorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateCalculatorDto: UpdateCalculatorDto) {
    return this.calculatorService.update(id, updateCalculatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.calculatorService.remove(id);
  }
}
