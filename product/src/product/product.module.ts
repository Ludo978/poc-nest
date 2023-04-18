import { EventPublisher } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { EventHandlers } from './events/handlers';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repository/product.repository';
import { ProductResolver } from './resolvers/product.resolver';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
  ],
  exports: [ProductResolver],
  providers: [
    EventPublisher,
    ProductResolver,
    ProductService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ProductRepository,
  ],
})
export class ProductModule {}
