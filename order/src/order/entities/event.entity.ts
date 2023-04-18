import { OrderDto } from '../dtos/order.dto';

export class Event {
  constructor(object: OrderDto, creatorAccountId: string) {
    this.object = object;
    this.creatorAccountId = creatorAccountId;
  }

  creatorAccountId!: string;

  object: OrderDto;
}
