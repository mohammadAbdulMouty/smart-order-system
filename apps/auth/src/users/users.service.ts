import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from '@app/prisma';
import * as bcrypt from 'bcrypt';
import { GetUserDTO } from './dto/get-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) throw new NotFoundException('User does not exist');
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid)
      throw new UnauthorizedException('User does not match');

    return user;
  }

  getUser(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }
}
