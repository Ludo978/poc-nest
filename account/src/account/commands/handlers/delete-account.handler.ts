import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { Success, GraphqlError } from 'src/shared/types';
import { DeleteAccountCommand } from '../impl/delete-account.command';
import { AccountRepository } from '../../repository/account.repository';
import {
  successBuilder,
  graphqlErrorBuilder,
  SuccessEnum,
  ErrorEnum,
} from '../../entities/utils.entity';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
implements ICommandHandler<DeleteAccountCommand> {
  constructor(
    private readonly repository: AccountRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(
    command: DeleteAccountCommand,
  ): Promise<Success | GraphqlError> {
    const { accountId, creatorId } = command;
    Logger.log(`${creatorId} deleted ${accountId}`, 'DeleteAccountCommand');
    try {
      const account = this.publisher.mergeObjectContext(
        await this.repository.delete(accountId, accountId),
      );
      account.commit();
      return successBuilder(SuccessEnum.ACCOUNT_DELETED, accountId);
    } catch (e) {
      return graphqlErrorBuilder(ErrorEnum.ACCOUNT_NOT_FOUND);
    }
  }
}
