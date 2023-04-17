import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountsDto } from 'src/account/dtos/account.dto';
import { GetQuery } from '../impl/get.query';
import { AccountRepository } from '../../repository/account.repository';

@QueryHandler(GetQuery)
export class GetHandler
implements IQueryHandler<GetQuery> {
  constructor(private readonly repository: AccountRepository) {}

  async execute(query: GetQuery): Promise<AccountsDto> {
    return this.repository.get(query.filters);
  }
}
