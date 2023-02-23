import { Role } from './../../authentication/schema/role.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserStatusEnum } from '../enum/user-status.enum';
import { Type } from 'class-transformer';

@Schema({ collection: 'user', timestamps: true })
export class User {
  @Prop({ auto: true })
  _id!: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: String, select: false })
  password: string;

  @Prop()
  status: UserStatusEnum;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Role.name })
  @Type(() => Role)
  roles: Role[];
}

export type UserDocument = mongoose.HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
