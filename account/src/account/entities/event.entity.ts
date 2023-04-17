import { AccountDto } from '../dtos/account.dto';

export class Event {
  constructor(object: AccountDto, creatorAccountId: string) {
    this.object = object;
    this.creatorAccountId = creatorAccountId;
  }

  creatorAccountId!: string;

  object: AccountDto;
}
