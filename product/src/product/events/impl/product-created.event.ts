import { IEvent } from '@nestjs/cqrs';
import { Event } from 'src/product/entities/event.entity';

export class ProductCreatedEvent implements IEvent {
  streamName: string;

  constructor(public readonly data: Event) {
    this.streamName = '$ce-productDto';
  }
}
