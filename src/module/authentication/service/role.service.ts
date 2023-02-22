import { Authority, AuthorityDocument } from './../schema/authority.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role, RoleDocument } from '../schema/role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: mongoose.Model<RoleDocument>,
  ) {}

  async init(authorities: Authority[]): Promise<Role> {
    const role = await this.roleModel.findOne().where({ code: 'ALL_AUTHORITY' }).populate('authorities').exec();
    if (!role) {
      return this.roleModel.create({
        name: 'All Authority',
        code: 'ALL_AUTHORITY',
        authorities: authorities.map((authority) => authority._id),
      });
    } else {
      const newAuthorities = authorities?.filter((authority_1) => !role.authorities.find(
        (roleAuthority) => roleAuthority.code === authority_1.code));
      if (newAuthorities) {
        role.authorities?.push(...newAuthorities);
        return await role.save();
      }
    }
  }
}
