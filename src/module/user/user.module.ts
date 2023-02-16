import { User, UserSchema } from './schema/user.schema';
import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserExportModule {}

@Module({
  imports: [
    UserExportModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
