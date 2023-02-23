import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthorityWithActions } from '../decorator/authority.decorator';
import { AuthorityActionEnum } from '../enum/authority-action.enum';
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
    const otherAuthorities = Object.keys(AuthorityEnum).reduce((all, authority) => {
      return [
        ...all,
        AuthorityWithActions(AuthorityEnum[authority], AuthorityActionEnum.MANAGE),
        AuthorityWithActions(AuthorityEnum[authority], AuthorityActionEnum.READ),
        AuthorityWithActions(AuthorityEnum[authority], AuthorityActionEnum.CREATE),
        AuthorityWithActions(AuthorityEnum[authority], AuthorityActionEnum.DELETE),
        AuthorityWithActions(AuthorityEnum[authority], AuthorityActionEnum.UPDATE),
      ]
    }, [])
      .filter(
        (authority) => !authorities.find((auth) => auth.code === authority),
      )
      .map(async (authority) => {
        let name = authority.replace(/_/gi, ' ').toLowerCase();
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
