import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { OrderCreatedEvent } from '../impl/order-created.event';
import { OrderRepository } from '../../repository/order.repository';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler
implements IEventHandler<OrderCreatedEvent> {
  constructor(private readonly repository: OrderRepository) {}

  async handle(event: OrderCreatedEvent) {
    await this.repository.createPersist(event.data);
    Logger.log(event.data.object.id, 'OrderCreatedEvent'); // write here
  }
}
