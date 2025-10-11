import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ToursService {
  private tours = [
    { id: 1, name: 'Tour Đà Lạt Mộng Mơ', price: 2000000 },
    { id: 2, name: 'Khám phá Vịnh Hạ Long', price: 3500000 },
  ];

  findAll() {
    return this.tours;
  }

  findOne(id: number) {
    const tour = this.tours.find((tour) => tour.id === id);
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }
    return tour;
  }

  // Chúng ta sẽ thêm create, update, delete sau
}
