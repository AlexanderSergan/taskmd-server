// Folder schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import mongoose from 'mongoose'

export type FolderDocument = HydratedDocument<Folder>

@Schema()
export class Folder {
  _id?: string

  @Prop({
    required: true,
    unique: false,
    type: mongoose.SchemaTypes.String,
  })
  userId: string

  @Prop({
    required: true,
    unique: false,
  })
  name: string

  @Prop({
    required: true,
    unique: false,
  })
  notesCount: number

  @Prop({
    required: true,
    unique: false,
    immutable: true,
  })
  editable: boolean

  @Prop({
    required: true,
    unique: false,
  })
  path: string

  @Prop({
    required: true,
    unique: false,
    type: mongoose.SchemaTypes.Array,
  })
  notes: any[]

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String,
    default: 'root',
  })
  parent: string

  @Prop({
    required: true,
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Folder',
  })
  subfolders: any[]

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}
const FolderSchema = SchemaFactory.createForClass(Folder)

function autoPopulateChildren(next) {
  this.populate('subfolders')
  next()
}

FolderSchema.pre('findOne', autoPopulateChildren).pre(
  'find',
  autoPopulateChildren,
)

export { FolderSchema }
