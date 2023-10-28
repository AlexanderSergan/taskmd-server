import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
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

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop()
  createdAt: Date;

  @Prop()
  friends: string[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);
