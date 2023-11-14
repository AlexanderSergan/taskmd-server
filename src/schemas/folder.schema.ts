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

  subfolders: Folder[]

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const FolderSchema = SchemaFactory.createForClass(Folder)

FolderSchema.add({
  subfolders: [FolderSchema],
})
