import {
  Controller,
  Post,
  Body,
  HttpException,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from 'users/users.service'
import { CreateUserDto, SignInDto } from 'users/users.dto'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { Get } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() user: CreateUserDto) {
    try {
      const saved = this.usersService.create(user)
      return saved
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }

  @Post('sign-in')
  async signIn(@Body() user: SignInDto) {
    try {
      return this.authService.signIn(user.username, user.password)
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }

  @UseGuards(AuthGuard)
  @Get('whoami')
  async whoami() {
    return 'I am a user'
  }
}
