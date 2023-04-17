import { IEvent } from '@nestjs/cqrs';
import { Event } from 'src/account/entities/event.entity';

export class AccountUpdatedEvent implements IEvent {
  streamName: string;

  constructor(public readonly data: Event) {
    this.streamName = '$ce-accountDto';
  }
}
