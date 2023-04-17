import { EventPublisher } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { EventHandlers } from './events/handlers';
import { AccountService } from './services/account.service';
import { AccountRepository } from './repository/account.repository';
import { AccountResolver } from './resolvers/account.resolver';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
  ],
  exports: [AccountResolver],
  providers: [
    EventPublisher,
    AccountResolver,
    AccountService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    AccountRepository,
  ],
})
export class AccountModule {}
