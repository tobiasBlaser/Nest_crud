import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/common/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async findUser(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async login(data: UserDTO): Promise<User> {
    const { username, password } = data;
    const user = await this.findUser(username);
    if (
      !user ||
      !(await this.authService.comparePassword(password, user.password))
    ) {
      throw new HttpException(
        'Invalide username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.authService.generateToken(user);
    return await this.authService.toResponseObject({ ...user, token });
  }

  async register(data: UserDTO): Promise<User> {
    const { username, password } = data;
    let user = await this.findUser(username);
    if (user) {
      throw new HttpException(
        'This username is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }
    data.password = await this.authService.hashPassword(password);
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    const token = await this.authService.generateToken(user);
    return await this.authService.toResponseObject({ ...user, token });
  }
}
