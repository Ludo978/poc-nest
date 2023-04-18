import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SuccessAccount, GraphqlErrorAccount } from 'src/account/dtos/account.dto';
import { UpdateAccountCommand } from '../impl/update-account.command';
import { AccountRepository } from '../../repository/account.repository';
import {
  successBuilder,
  graphqlErrorBuilder,
  SuccessEnum,
  ErrorEnum,
} from '../../entities/utils.entity';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountHandler
implements ICommandHandler<UpdateAccountCommand> {
  constructor(
    private readonly repository: AccountRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(
    command: UpdateAccountCommand,
  ): Promise<SuccessAccount | GraphqlErrorAccount> {
    const { accountInput, creatorId } = command;
    Logger.log(`${creatorId} updated ${accountInput.id}`, 'UpdateAccountCommand');
    try {
      const account = this.publisher.mergeObjectContext(
        await this.repository.update(accountInput, creatorId),
      );
      account.commit();
      return successBuilder(SuccessEnum.ACCOUNT_UPDATED, accountInput.id);
    } catch (e) {
      return graphqlErrorBuilder(ErrorEnum.ERROR);
    }
  }
}
