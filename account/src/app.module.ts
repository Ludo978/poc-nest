import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { EventStoreBusConfig, EventStoreSubscriptionType, EventStoreCqrsModule } from 'src/shared/eventstore-cqrs';
import { PrismaModule } from './prisma/prisma.module';
import { AccountModule } from './account/account.module';
import { AccountCreatedEvent } from './account/events/impl/account-created.event';
import { AccountUpdatedEvent } from './account/events/impl/account-updated.event';
import { AccountDeletedEvent } from './account/events/impl/account-deleted.event';

export const eventStoreBusConfig: EventStoreBusConfig = {
  subscriptions: [
    {
      type: EventStoreSubscriptionType.Persistent,
      stream: '$ce-accountDto',
      persistentSubscriptionName: 'account',
    },
  ],
  events: {
    AccountCreatedEvent,
    AccountUpdatedEvent,
    AccountDeletedEvent,
  },
};

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: join(process.cwd(), 'src/schema.gql'), federation: 2 },
      sortSchema: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    EventStoreCqrsModule.forRootAsync(
      {
        useFactory: async () => ({
          settings: {
            insecure: true,
          },
          endpoint: {
            endpoint: {
              address: 'eventstore',
              port: 2113,
            },
          },
          credentials: {
            username: 'admin',
            password: 'changeit',
          },
        }),
      },
      eventStoreBusConfig,
    ),
    PrismaModule,
    AccountModule,
  ],
})
export class AppModule {}
