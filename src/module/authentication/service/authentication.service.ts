import { UserService } from '../../user/service/user.service';
import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ValidateAuthenticationDto } from '../dto/validate-authentication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/module/user/schema/user.schema';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}
  async validate(ValidateAuthenticationDto: ValidateAuthenticationDto): Promise<User> {
    // const user = await this.userService.findOne({ email: '' });
    return ;
  }

}
