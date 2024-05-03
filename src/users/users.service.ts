import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const preparedData = {
        ...createUserDto,
        tracks:
          createUserDto.tracks && createUserDto.tracks?.length > 0
            ? JSON.stringify(createUserDto.tracks)
            : '',
      };
      const data = await this.usersRepository.save(preparedData);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  async getUsers() {
    try {
      return await this.usersRepository.find();
    } catch (e) {
      console.log(e);
    }
  }
  async getUser(id: number) {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (e) {
      console.log(e);
    }
  }
  async deleteUser(id: string) {
    try {
      await this.usersRepository.delete(id);
      return 'Пользователь удален';
    } catch (e) {
      console.log(e);
    }
  }
}
