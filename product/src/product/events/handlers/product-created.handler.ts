import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductCreatedEvent } from '../impl/product-created.event';
import { ProductRepository } from '../../repository/product.repository';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
implements IEventHandler<ProductCreatedEvent> {
  constructor(private readonly repository: ProductRepository) {}

  async handle(event: ProductCreatedEvent) {
    await this.repository.createPersist(event.data);
    Logger.log(event.data.object.id, 'ProductCreatedEvent'); // write here
  }
}
