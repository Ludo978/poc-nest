import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { EventStoreBusConfig, EventStoreSubscriptionType, EventStoreCqrsModule } from 'src/shared/eventstore-cqrs';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { ProductCreatedEvent } from './product/events/impl/product-created.event';
import { ProductUpdatedEvent } from './product/events/impl/product-updated.event';
import { ProductDeletedEvent } from './product/events/impl/product-deleted.event';

export const eventStoreBusConfig: EventStoreBusConfig = {
  subscriptions: [
    {
      type: EventStoreSubscriptionType.Persistent,
      stream: '$ce-productDto',
      persistentSubscriptionName: 'product',
    },
  ],
  events: {
    ProductCreatedEvent,
    ProductUpdatedEvent,
    ProductDeletedEvent,
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
    ProductModule,
  ],
})
export class AppModule {}
