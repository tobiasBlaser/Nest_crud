import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async login(data: UserDTO): Promise<User> {
    const { username, password } = data;
    const user = await this.findUser(username);
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalide username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }

  async register(data: UserDTO): Promise<User> {
    const { username } = data;
    let user = await this.findUser(username);
    if (user) {
      throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
}
