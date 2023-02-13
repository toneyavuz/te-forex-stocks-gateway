import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CalculatorService } from '../service/calculator.service';
import { CreateCalculatorDto } from '../dto/create-calculator.dto';
import { UpdateCalculatorDto } from '../dto/update-calculator.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {
  }

  @Post()
  create(@Body() createCalculatorDto: CreateCalculatorDto) {
    return this.calculatorService.create(createCalculatorDto);
  }

  @Get()
  findAll() {
    return this.calculatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calculatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalculatorDto: UpdateCalculatorDto) {
    return this.calculatorService.update(+id, updateCalculatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calculatorService.remove(+id);
  }
}
