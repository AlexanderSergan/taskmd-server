import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import mongoose from 'mongoose'

export type CatDocument = HydratedDocument<Cat>

@Schema()
export class Cat {
  @Prop({
    required: false,
    unique: false,
  })
  id: string

  @Prop({
    required: true,
    unique: true,
  })
  name: string

  @Prop({
    type: mongoose.SchemaTypes.Number,
    min: 0,
    max: 30,
  })
  age: number

  @Prop()
  breed: string

  @Prop()
  createdAt: Date

  @Prop()
  friends: string[]

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: 'Cat',
  })
  parent: Cat | undefined

  @Prop({
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Cat',
  })
  children: any[]
}

const CatSchema = SchemaFactory.createForClass(Cat)

const autoPopulateChildren = function (next) {
  this.populate('children')
  next()
}

CatSchema.pre('findOne', autoPopulateChildren).pre('find', autoPopulateChildren)

export { CatSchema }
