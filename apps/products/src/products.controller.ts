import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '@app/auth-shared';
import { CurrentUser } from '@app/decorators';
import type { UserDto } from '@app/dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@CurrentUser() user: UserDto) {
    return user;
  }
}
