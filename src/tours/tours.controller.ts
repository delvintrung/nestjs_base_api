import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  // GET /tours/123
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe tự động chuyển string 'id' thành number và báo lỗi nếu không hợp lệ
    return this.toursService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTourDto: Record<string, any>) {
    // return this.toursService.create(createTourDto);
    return { message: 'Tour created successfully!', data: createTourDto };
  }
}
