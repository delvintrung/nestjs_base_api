import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private toursRepository: Repository<Tour>,
  ) {}

  findAll(): Promise<Tour[]> {
    return this.toursRepository.find();
  }

  findOne(id: number): Promise<Tour | null> {
    return this.toursRepository.findOneBy({ id });
  }

  async create(createTourDto: CreateTourDto): Promise<Tour> {
    const existingTour = await this.toursRepository.findOneBy({
      name: createTourDto.name,
    });
    if (existingTour) {
      throw new NotFoundException('Tour name already exists');
    }

    const newTourEntity = this.toursRepository.create({
      name: createTourDto.name,
      price: createTourDto.price,
      description: createTourDto.description,
    });
    return this.toursRepository.save(newTourEntity);
  }

  async update(id: number, updateTourDto: UpdateTourDto): Promise<Tour> {
    // Dùng preload để tìm entity theo id và hợp nhất (merge) dữ liệu mới vào.
    // Cách này an toàn hơn là tự fetch rồi gán thuộc tính.
    const tour = await this.toursRepository.preload({
      id: id,
      ...updateTourDto,
    });

    // Nếu không tìm thấy tour với id đó, ném ra lỗi
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }

    return this.toursRepository.save(tour);
  }

  async remove(id: number): Promise<void> {
    const tour = await this.toursRepository.findOneBy({ id });
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }
    await this.toursRepository.remove(tour);
  }
  // Chúng ta sẽ thêm create, update, delete sau
}
