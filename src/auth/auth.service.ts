import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const valid = user && (await bcrypt.compare(password, user.password));

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }
  }

  async signup(signupUserInput: CreateUserInput) {
    const user = await this.usersService.findOne(signupUserInput.email);

    if (user) {
      throw new Error('User already exists');
    }

    const password = await bcrypt.hash(signupUserInput.password, 10);

    return this.usersService.create({
      ...signupUserInput,
      password,
    });
  }

  async login(user: User) {
    const { password, ...result } = user;

    return {
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: result,
    };
  }
}
