import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  app.use(cookieParser());
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
