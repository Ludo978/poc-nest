import { ICommand } from '@nestjs/cqrs';
import { UpdateAccountInputDto } from '../../inputs/account.input';

export class UpdateAccountCommand implements ICommand {
  constructor(
    public readonly accountInput: UpdateAccountInputDto,
    public readonly creatorId: string,
  ) {}
}
