import { IQuery } from '@nestjs/cqrs';
import { FilterProductInputDto } from 'src/product/inputs/filter.input';

export class GetQuery implements IQuery {
  constructor(public readonly filters?: FilterProductInputDto) { }
}
