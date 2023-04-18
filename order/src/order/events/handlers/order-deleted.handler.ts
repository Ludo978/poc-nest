import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { OrderDeletedEvent } from '../impl/order-deleted.event';
import { OrderRepository } from '../../repository/order.repository';

@EventsHandler(OrderDeletedEvent)
export class OrderDeletedHandler
implements IEventHandler<OrderDeletedEvent> {
  constructor(private readonly repository: OrderRepository) {}

  async handle(event: OrderDeletedEvent) {
    await this.repository.deletePersist(event.data);
    Logger.log(event.data.object.id, 'OrderDeletedEvent'); // write here
  }
}
