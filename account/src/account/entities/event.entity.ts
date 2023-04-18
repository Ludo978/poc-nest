import { AccountDto } from '../dtos/account.dto';
import { OrderDto } from '../dtos/order.dto';

export class Event {
  constructor(object: AccountDto, creatorAccountId: string) {
    this.object = object;
    this.creatorAccountId = creatorAccountId;
  }

  creatorAccountId!: string;

  object: AccountDto;
}

export class EventOrder {
  constructor(object: OrderDto, creatorAccountId: string) {
    this.object = object;
    this.creatorAccountId = creatorAccountId;
  }

  creatorAccountId!: string;

  object: OrderDto;
}
