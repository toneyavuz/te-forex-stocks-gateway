import { AuthorityEnum } from './../enum/authority.enum';
import { SetMetadata } from "@nestjs/common";
import { AuthorityActionEnum } from '../enum/authority-action.enum';
export const AUTHORITY_KEY = 'authorities';
export const Authorities = (...authoroties: string[]) => SetMetadata(AUTHORITY_KEY, authoroties);
export const AuthorityWithActions = (authorityEnum: AuthorityEnum, authorityAction: AuthorityActionEnum): string => `${authorityEnum}_${authorityAction}`;