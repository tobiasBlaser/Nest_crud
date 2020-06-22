import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('api/login')
  login(@Body() data: UserDTO): Promise<User> {
    return this.userService.login(data);
  }

  @Post('api/register')
  register(@Body() data: UserDTO): Promise<User> {
    return this.userService.register(data);
  }
}
