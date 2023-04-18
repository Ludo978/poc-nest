import { IQuery } from '@nestjs/cqrs';
import { FilterOrderInputDto } from 'src/order/inputs/filter.input';

export class GetQuery implements IQuery {
  constructor(public readonly filters?: FilterOrderInputDto) { }
}
