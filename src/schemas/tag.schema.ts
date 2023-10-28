import { Schema, Prop } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

@Schema()
export class Tag {
  @Prop({
    required: true,
    unique: true,
  })
  id: string;

  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: false,
  })
  color: string;

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  })
  createdBy: User;
}
