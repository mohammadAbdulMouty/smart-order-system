import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { RmqModule } from '@app/rmq';
import { AUTH_SERVICE } from '@app/auth-shared';
import { ConfigModule } from '@nestjs/config';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import Joi from 'joi';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/products/.env',
    }),
    RmqModule.register({ name: AUTH_SERVICE }),
    PrismaModule,
  ],
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService, CategoriesService],
})
export class ProductsModule {}
