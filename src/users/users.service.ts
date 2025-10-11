import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = {
      id: Date.now(),
      username: createUserDto.username,
      password: hashedPassword,
    };
    this.users.push(newUser);
    const { password, ...result } = newUser;
    return result;
  }

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
