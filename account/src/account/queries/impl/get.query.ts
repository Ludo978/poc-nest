import { IQuery } from '@nestjs/cqrs';
import { FilterAccountInputDto } from 'src/account/inputs/filter.input';

export class GetQuery implements IQuery {
  constructor(public readonly filters?: FilterAccountInputDto) { }
}
