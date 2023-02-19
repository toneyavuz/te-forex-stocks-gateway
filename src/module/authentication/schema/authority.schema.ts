import { User } from '../../user/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';

@Schema({ collection: 'authority', timestamps: true })
export class Authority {
  @Prop({ auto: true })
  _id!: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  code: string;

  // owner
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: false })
  @Type(() => User)
  user: User;
}

export type AuthorityDocument = mongoose.HydratedDocument<Authority>;
export const AuthoritySchema = SchemaFactory.createForClass(Authority);
