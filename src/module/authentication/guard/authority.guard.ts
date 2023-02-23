import { User } from '../../user/schema/user.schema';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Authority } from '../schema/authority.schema';
import { AUTHORITY_KEY } from '../decorator/authority.decorator';

@Injectable()
export class AuthorityGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
    const authorities = this.reflector.get<string[]>(AUTHORITY_KEY, context.getHandler())
    const user = context.switchToHttp().getRequest().user as User;
    const allUserAuthorities = user?.roles?.reduce((as, item) => as.concat(item.authorities), [] as Authority[]) ?? [];
    if (!authorities || authorities.length === 0) return true
    if(user?.roles?.length === 0) {
      return false;
    }
    if (!allUserAuthorities.map(authority => authorities.some(a => a === authority.code))) {
        throw new HttpException(`Missing at least one scope of `, HttpStatus.FORBIDDEN)
    }
    return true;
  }
}
