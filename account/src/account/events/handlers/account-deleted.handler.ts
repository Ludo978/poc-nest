import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { AccountDeletedEvent } from '../impl/account-deleted.event';
import { AccountRepository } from '../../repository/account.repository';

@EventsHandler(AccountDeletedEvent)
export class AccountDeletedHandler
implements IEventHandler<AccountDeletedEvent> {
  constructor(private readonly repository: AccountRepository) {}

  async handle(event: AccountDeletedEvent) {
    await this.repository.deletePersist(event.data);
    Logger.log(event.data.object.id, 'AccountDeletedEvent'); // write here
  }
}
