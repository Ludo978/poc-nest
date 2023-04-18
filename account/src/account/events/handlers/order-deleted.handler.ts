import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { AccountRepository } from 'src/account/repository/account.repository';
import { OrderDeletedEvent } from '../impl/order-deleted.event';

@EventsHandler(OrderDeletedEvent)
export class OrderDeletedHandler
implements IEventHandler<OrderDeletedEvent> {
  constructor(private readonly repository: AccountRepository) {}

  async handle(event: OrderDeletedEvent) {
    await this.repository.handleOrderDeleted(event.data);
    Logger.log(event.data.object.id, 'OrderDeletedEvent'); // write here
  }
}
