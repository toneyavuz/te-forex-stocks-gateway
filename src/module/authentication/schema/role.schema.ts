import { User } from '../../user/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { Authority } from './authority.schema';

@Schema({ collection: 'role', timestamps: true })
export class Role {
  @Prop({ auto: true })
  _id!: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  code: string;

  // owner
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  @Type(() => User)
  user: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Authority.name })
  @Type(() => Authority)
  authorities: Authority[];
}

export type RoleDocument = mongoose.HydratedDocument<Role>;
export const RoleSchema = SchemaFactory.createForClass(Role);
