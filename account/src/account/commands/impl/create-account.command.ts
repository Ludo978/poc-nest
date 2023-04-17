import { ICommand } from '@nestjs/cqrs';
import { AccountInputDto } from '../../inputs/account.input';

export class CreateAccountCommand implements ICommand {
  constructor(
    public readonly accountInput: AccountInputDto,
    public readonly creatorId: string,
  ) {}
}
