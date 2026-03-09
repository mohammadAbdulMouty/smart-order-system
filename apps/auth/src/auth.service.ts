import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '@app/prisma';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(registerDto: RegisterDto) {
    const hasPassword = await bcrypt.hash(registerDto.password, 12);
    return this.prismaService.user.create({
      data: { ...registerDto, password: hasPassword },
    });
  }



  login(user: User, response: Response) {
    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.getOrThrow<number>('JWT_EXPIRATION'),
    );
    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, { httpOnly: true, expires });
  }
}
