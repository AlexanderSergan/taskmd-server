import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async singIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)

    if (user?.password !== pass) {
      throw new UnauthorizedException()
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      // todo: generate a JWT token and return it here

      return result
    }
  }
}
