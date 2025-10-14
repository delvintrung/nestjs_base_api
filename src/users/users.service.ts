import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUserEntity = this.usersRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
    });
    const newUser = await this.usersRepository.save(newUserEntity);
    const { password, ...result } = newUser;
    return result;
  }

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username: username });
  }
}
