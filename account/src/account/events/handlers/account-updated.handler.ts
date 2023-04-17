import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { AccountUpdatedEvent } from '../impl/account-updated.event';
import { AccountRepository } from '../../repository/account.repository';

@EventsHandler(AccountUpdatedEvent)
export class AccountUpdatedHandler
implements IEventHandler<AccountUpdatedEvent> {
  constructor(private readonly repository: AccountRepository) {}

  async handle(event: AccountUpdatedEvent) {
    await this.repository.updatePersist(event.data);
    Logger.log(event.data.object.id, 'AccountUpdatedEvent'); // write here
  }
}
