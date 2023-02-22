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

  async init(): Promise<Authority[]> {
    const authorities = await this.authorityModel
      .find({
        code: {
          $in: Object.keys(AuthorityEnum),
        },
      })
      .exec();
    const allAuthorities = [...authorities];
    const otherAuthorities = Object.keys(AuthorityEnum)
      .filter(
        (authority) => !authorities.find((auth) => auth.code === authority),
      )
      .map(async (authority) => {
        let name = AuthorityEnum[authority].replace(/_/gi, ' ').toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return await this.authorityModel.create({
          name,
          code: authority,
        });
      });
    allAuthorities.concat(await Promise.all(otherAuthorities));
    return allAuthorities;
  }
}
