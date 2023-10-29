import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose'
import { CreateUserDto } from './users.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel({ ...user, createdAt: new Date() })
      const saved = await createdUser.save()
      return saved
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  async findOne(username: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ username })
      return user
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  // Delete all test users
  async deleteTestUsers(): Promise<any> {
    return await this.userModel.deleteMany({ username: /test/i })
  }
}
