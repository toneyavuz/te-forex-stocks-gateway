import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthorityEnum } from '../enum/authority.enum';
import { Authority, AuthorityDocument } from '../schema/authority.schema';

@Injectable()
export class AuthorityService {
  constructor(
    @InjectModel(Authority.name)
    private authorityModel: mongoose.Model<AuthorityDocument>,
  ) {}

  init() {
    this.authorityModel
      .find()
      .exec()
      .then((authorities) => {
        Object.keys(AuthorityEnum).forEach(async (authority) => {
          if (!authorities.find((auth) => auth.code === authority)) {
            await this.authorityModel.create({
              name: authority,
              code: AuthorityEnum[authority].replace(/_/gi, ' '),
            });
          }
        });
      });
  }
}
