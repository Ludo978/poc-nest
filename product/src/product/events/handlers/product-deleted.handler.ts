import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductDeletedEvent } from '../impl/product-deleted.event';
import { ProductRepository } from '../../repository/product.repository';

@EventsHandler(ProductDeletedEvent)
export class ProductDeletedHandler
implements IEventHandler<ProductDeletedEvent> {
  constructor(private readonly repository: ProductRepository) {}

  async handle(event: ProductDeletedEvent) {
    await this.repository.deletePersist(event.data);
    Logger.log(event.data.object.id, 'ProductDeletedEvent'); // write here
  }
}
