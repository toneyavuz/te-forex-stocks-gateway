import { SetMetadata } from "@nestjs/common";

export const Authorities = (...scopes: string[]) => SetMetadata('authorities', scopes);
