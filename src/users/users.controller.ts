import {
  Controller,
  Post,
  Body,
  HttpException,
  Get,
  Delete,
} from '@nestjs/common'
import { UsersService } from 'users/users.service'
import { CreateUserDto } from 'users/users.dto'
import { User } from '../schemas/user.schema'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get all users
   *
   * @return {*}  {Promise<User[]>}
   * @memberof UsersController
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.getAllUsers()
  }

  @Post() // Create user
  async create(@Body() user: CreateUserDto) {
    try {
      const saved = await this.usersService.create(user)
      return saved
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }

  @Delete()
  async deleteTestUsers() {
    try {
      const deleted = await this.usersService.deleteTestUsers()
      return deleted
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }
}
