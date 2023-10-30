import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  _id?: string

  @Prop({
    required: true,
    unique: false,
  })
  username: string

  @Prop({
    required: true,
    unique: false,
  })
  password: string

  @Prop()
  createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
