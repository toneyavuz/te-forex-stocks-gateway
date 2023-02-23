import { Role } from './../../authentication/schema/role.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidateAuthenticationDto } from '../../authentication/dto/validate-authentication.dto';
import { CreateUserDto, UpdateUserDto } from '../dto/create-user.dto';
import { User, UserDocument } from '../schema/user.schema';
import * as mongoose from 'mongoose';
import { RoleDocument } from '../../authentication/schema/role.schema';
import { ConfigService } from '@nestjs/config';
import { UserStatusEnum } from '../enum/user-status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async init(role: Role): Promise<User> {
    return this.userModel
        .findOne()
        .where({ username: 'tone' })
        .populate('roles')
        .exec().then(async (user) => {
      if (!user) {
        return await this.userModel.create({
          email: 'toneyavuz@gmail.com',
          password: this.configService.get('ROOT_USER_PASSWORD'),
          username: 'tone',
          status: UserStatusEnum.ACTIVE,
          roles: [role],
        } as User);
      }
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create({
      ...createUserDto,
      status: UserStatusEnum.UNCONFIRMED,
    });
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(where: any): Promise<User> {
    const user = await this.userModel.findOne(where).exec();
    return user;
  }

  async findOneById(id: mongoose.ObjectId): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    return user;
  }

  validate(
    validateAuthenticationDto: ValidateAuthenticationDto,
  ): Promise<User> {
    return this.userModel.findOne(validateAuthenticationDto).exec();
  }

  async update(
    id: mongoose.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: mongoose.ObjectId): Promise<User> {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
