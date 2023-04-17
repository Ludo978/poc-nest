import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GraphqlError } from 'src/shared/types';
import { AuthPayloadDto } from 'src/account/dtos/account.dto';
import { LoginQuery } from '../impl/login.query';
import { AccountRepository } from '../../repository/account.repository';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  constructor(private readonly repository: AccountRepository) {}

  async execute(query: LoginQuery): Promise<AuthPayloadDto | GraphqlError> {
    return this.repository.login(query.input);
  }
}
