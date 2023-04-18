import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SuccessAccount, GraphqlErrorAccount } from '../../dtos/account.dto';
import { CreateAccountCommand } from '../impl/create-account.command';
import { AccountRepository } from '../../repository/account.repository';
import {
  successBuilder,
  graphqlErrorBuilder,
  SuccessEnum,
  ErrorEnum,
} from '../../entities/utils.entity';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
implements ICommandHandler<CreateAccountCommand> {
  constructor(
    private readonly repository: AccountRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(
    command: CreateAccountCommand,
  ): Promise<SuccessAccount | GraphqlErrorAccount> {
    const { accountInput, creatorId } = command;
    const id = uuidv4();
    Logger.log(`${creatorId} created ${id}`, 'CreateAccountCommand');
    try {
      const account = this.publisher.mergeObjectContext(
        await this.repository.create(accountInput, id, creatorId),
      );
      account.commit();
      return successBuilder(SuccessEnum.ACCOUNT_CREATED, id);
    } catch (e) {
      return graphqlErrorBuilder(ErrorEnum.ERROR);
    }
  }
}
