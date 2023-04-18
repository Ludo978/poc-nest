import { IEvent } from '@nestjs/cqrs';
import { Event } from 'src/order/entities/event.entity';

export class OrderDeletedEvent implements IEvent {
  streamName: string;

  constructor(public readonly data: Event) {
    this.streamName = '$ce-orderDto';
  }
}
