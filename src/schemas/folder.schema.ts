// Folder schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

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

  notes: any[]

  subfolders: Folder[]

  @Prop()
  createdAt: Date
}

export const FolderSchema = SchemaFactory.createForClass(Folder)

FolderSchema.add({
  subfolders: [FolderSchema],
})
