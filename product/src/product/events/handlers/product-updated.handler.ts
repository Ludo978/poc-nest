import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductUpdatedEvent } from '../impl/product-updated.event';
import { ProductRepository } from '../../repository/product.repository';

@EventsHandler(ProductUpdatedEvent)
export class ProductUpdatedHandler
implements IEventHandler<ProductUpdatedEvent> {
  constructor(private readonly repository: ProductRepository) {}

  async handle(event: ProductUpdatedEvent) {
    await this.repository.updatePersist(event.data);
    Logger.log(event.data.object.id, 'ProductUpdatedEvent'); // write here
  }
}
