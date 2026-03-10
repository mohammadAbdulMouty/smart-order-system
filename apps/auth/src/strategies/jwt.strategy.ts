import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { PassportStrategy } from '@nestjs/passport';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any): string | null => {
          const token =
            ((request.cookies as { Authentication?: string })?.Authentication ||
              request?.Authentication) ??
            null;
          return token;
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(request, { email }: { email: string }) {
    return this.usersService.getUser(email);
  }
}
