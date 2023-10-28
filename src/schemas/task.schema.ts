// Task schema

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { User } from './user.schema'
import mongoose from 'mongoose'

export type TaskDocument = HydratedDocument<Task>

@Schema()
export class Task {
  @Prop({
    required: true,
    unique: true,
  })
  id: string

  @Prop({
    required: true,
    unique: false,
  })
  title: string

  @Prop({
    required: true,
    unique: false,
  })
  body: string

  @Prop({
    required: false,
    unique: false,
  })
  deadline: Date

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  })
  createdBy: User

  @Prop({
    required: false,
  })
  createdAt: Date

  @Prop({
    required: false,
    unique: false,
  })
  updatedAt: Date

  @Prop({
    required: false,
    unique: false,
  })
  status: 'todo' | 'doing' | 'done'
}

export const TaskSchema = SchemaFactory.createForClass(Task)
