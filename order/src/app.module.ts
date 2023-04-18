import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { EventStoreBusConfig, EventStoreSubscriptionType, EventStoreCqrsModule } from 'src/shared/eventstore-cqrs';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { OrderCreatedEvent } from './order/events/impl/order-created.event';
import { OrderUpdatedEvent } from './order/events/impl/order-updated.event';
import { OrderDeletedEvent } from './order/events/impl/order-deleted.event';

export const eventStoreBusConfig: EventStoreBusConfig = {
  subscriptions: [
    {
      type: EventStoreSubscriptionType.Persistent,
      stream: '$ce-orderDto',
      persistentSubscriptionName: 'order',
    },
  ],
  events: {
    OrderCreatedEvent,
    OrderUpdatedEvent,
    OrderDeletedEvent,
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
    OrderModule,
  ],
})
export class AppModule {}
