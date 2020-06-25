import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/auth/local-auth.guard';
import { User } from './user.entity';
import { UserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('api/login')
  login(@Body() data: UserDTO): Promise<User> {
    return this.userService.login(data);
  }

  @Post('api/register')
  register(@Body() data: UserDTO): Promise<User> {
    return this.userService.register(data);
  }
}
