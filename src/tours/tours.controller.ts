import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.toursService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTourDto: UpdateTourDto,
  ) {
    return this.toursService.update(id, updateTourDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.toursService.remove(id);
  }
}
