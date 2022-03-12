import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersSerivce: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersSerivce.findOne(username);

    if (!user) {
      console.log('User not found');
    }

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
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
