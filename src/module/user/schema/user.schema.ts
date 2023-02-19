import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import * as moment from 'moment';

@Schema({ collection: 'user', timestamps: true })
export class User extends Document {
  @Prop({ required: true, index: { unique: true } })
  username: string;

  @Prop({ type: String, select: false })
  password: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
