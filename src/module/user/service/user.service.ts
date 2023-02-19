import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidateAuthenticationDto } from '../../authentication/dto/validate-authentication.dto';
import { CreateUserDto, UpdateUserDto } from '../dto/create-user.dto';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  
  validateUser(username: string): Promise<any> {
    return ;
  }
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  
  validate(validateAuthenticationDto: ValidateAuthenticationDto): Promise<User> {
    return this.userModel.findOne(validateAuthenticationDto).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
