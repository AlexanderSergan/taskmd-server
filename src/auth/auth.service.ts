import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UsersService } from 'users/users.service'
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
    }

    const payload = { username: user.username, sub: user._id }
    const access_token = await this.jwtService.signAsync(payload)
    return {
      access_token,
    }

    return null
  }

  async decodeBearerToken(token: string) {
    const bearer = token.split(' ')
    const bearerToken = bearer[1]
    return await this.jwtService.decode(bearerToken)
  }

  async decodeToken(token: string) {
    return await this.jwtService.decode(token)
  }

  async getUserIdByHeader(token: string) {
    const decoded = await this.decodeBearerToken(token)
    return decoded['sub']
  }
}
