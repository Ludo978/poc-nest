import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { AccountCreatedEvent } from '../impl/account-created.event';
import { AccountRepository } from '../../repository/account.repository';

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedHandler
implements IEventHandler<AccountCreatedEvent> {
  constructor(private readonly repository: AccountRepository) {}

  async handle(event: AccountCreatedEvent) {
    await this.repository.createPersist(event.data);
    Logger.log(event.data.object.id, 'AccountCreatedEvent'); // write here
  }
}
