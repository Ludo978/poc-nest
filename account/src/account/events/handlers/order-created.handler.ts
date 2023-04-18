import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { AccountRepository } from 'src/account/repository/account.repository';
import { OrderCreatedEvent } from '../impl/order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler
implements IEventHandler<OrderCreatedEvent> {
  constructor(private readonly repository: AccountRepository) {}

  async handle(event: OrderCreatedEvent) {
    await this.repository.handleOrderCreated(event.data);
    Logger.log(event.data.object.id, 'OrderCreatedEvent'); // write here
  }
}
