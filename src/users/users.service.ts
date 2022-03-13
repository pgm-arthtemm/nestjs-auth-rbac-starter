import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRespository.find();
  }

  findOne(email: string): Promise<User> {
    return this.usersRespository.findOne({ email });
  }

  create(createUserInput: CreateUserInput) {
    const user = this.usersRespository.create(createUserInput);
    return this.usersRespository.save(user);
  }
}
