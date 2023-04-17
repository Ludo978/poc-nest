import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Success, GraphqlError } from 'src/shared/types';
import { AccountsDto, AuthPayloadDto } from '../dtos/account.dto';
import { AccountInputDto, LoginInputDto, UpdateAccountInputDto } from '../inputs/account.input';
import { FilterAccountInputDto } from '../inputs/filter.input';
import { GetQuery } from '../queries/impl/get.query';
import { CreateAccountCommand } from '../commands/impl/create-account.command';
import { UpdateAccountCommand } from '../commands/impl/update-account.command';
import { DeleteAccountCommand } from '../commands/impl/delete-account.command';
import { LoginQuery } from '../queries/impl/login.query';

@Injectable()
export class AccountService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  async create(accountInput: AccountInputDto, creatorId: string): Promise<Success | GraphqlError> {
    return this.commandBus.execute(new CreateAccountCommand(accountInput, creatorId));
  }

  async get(filters: FilterAccountInputDto): Promise<AccountsDto> {
    return this.queryBus.execute(new GetQuery(filters));
  }

  async update(
    accountInput: UpdateAccountInputDto,
    creatorId: string,
  ): Promise<Success | GraphqlError> {
    return this.commandBus.execute(new UpdateAccountCommand(accountInput, creatorId));
  }

  async delete(accountId: string, creatorId: string): Promise<Success | GraphqlError> {
    return this.commandBus.execute(new DeleteAccountCommand(accountId, creatorId));
  }

  async login(account: LoginInputDto): Promise<AuthPayloadDto | GraphqlError> {
    return this.queryBus.execute(new LoginQuery(account));
  }
}
