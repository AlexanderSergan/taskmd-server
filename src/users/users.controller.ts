import { Controller, Post, Body, HttpException } from '@nestjs/common'
import { UsersService } from 'users/users.service'
import { CreateUserDto } from 'users/users.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // Create user
  async create(@Body() user: CreateUserDto) {
    try {
      const saved = await this.usersService.create(user)
      return saved
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }
}
