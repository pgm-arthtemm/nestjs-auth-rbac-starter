import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @Query(() => User, { name: 'userByEmail' })
  findByEmail(@Args('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }
}
