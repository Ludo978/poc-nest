import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { OrderUpdatedEvent } from '../impl/order-updated.event';
import { OrderRepository } from '../../repository/order.repository';

@EventsHandler(OrderUpdatedEvent)
export class OrderUpdatedHandler
implements IEventHandler<OrderUpdatedEvent> {
  constructor(private readonly repository: OrderRepository) {}

  async handle(event: OrderUpdatedEvent) {
    await this.repository.updatePersist(event.data);
    Logger.log(event.data.object.id, 'OrderUpdatedEvent'); // write here
  }
}
