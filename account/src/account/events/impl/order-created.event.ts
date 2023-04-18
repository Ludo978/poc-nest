import { IEvent } from '@nestjs/cqrs';
import { EventOrder } from 'src/account/entities/event.entity';

export class OrderCreatedEvent implements IEvent {
  streamName: string;

  constructor(public readonly data: EventOrder) {
    this.streamName = '$ce-orderDto';
  }
}
