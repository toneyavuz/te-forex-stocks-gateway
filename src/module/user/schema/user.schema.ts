import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'user'})
export class User {
  @Prop({required: true, index: { unique: true }})
  username: string;

  @Prop({ type: String, private: true })
  password: string;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
