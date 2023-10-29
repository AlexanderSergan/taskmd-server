import { Controller, Post, Body, HttpException } from '@nestjs/common'
import { UsersService } from 'users/users.service'
import { CreateUserDto } from 'users/users.dto'

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() user: CreateUserDto) {
    try {
      const saved = this.usersService.create(user)
      return saved
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }
}
