import { Authority, AuthorityDocument } from './../schema/authority.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role, RoleDocument } from '../schema/role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Authority.name)
    private authorityModel: mongoose.Model<AuthorityDocument>,
    @InjectModel(Role.name)
    private roleModel: mongoose.Model<RoleDocument>,
  ) {}

  init() {
    Promise.all([
      this.authorityModel.find().exec(),
      this.roleModel.find().populate('authorities').exec(),
    ]).then(([authorities, roles]) => {
      const role = roles.find((role) => role.code === 'ALL_AUTHORITY');


      if (!role) {
        this.roleModel.create({
          name: 'All Authority',
          code: 'ALL_AUTHORITY',
          authorities: authorities.map((authority) => authority._id),
        });
      } else {
        const newAuthorities = authorities?.filter((authority) =>
            !role.authorities.find(
              (roleAuthority) => roleAuthority.code === authority.code,
            ),
        );
        
        if (newAuthorities) {
          role.authorities?.push(...newAuthorities);
          role.save();
        }
      }
    });
  }
}
