import { EventPublisher } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { EventHandlers } from './events/handlers';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repository/order.repository';
import { OrderResolver } from './resolvers/order.resolver';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
  ],
  exports: [OrderResolver],
  providers: [
    EventPublisher,
    OrderResolver,
    OrderService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    OrderRepository,
  ],
})
export class OrderModule {}
