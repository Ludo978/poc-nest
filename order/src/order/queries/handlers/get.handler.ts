import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrdersDto } from 'src/order/dtos/order.dto';
import { GetQuery } from '../impl/get.query';
import { OrderRepository } from '../../repository/order.repository';

@QueryHandler(GetQuery)
export class GetHandler
implements IQueryHandler<GetQuery> {
  constructor(private readonly repository: OrderRepository) {}

  async execute(query: GetQuery): Promise<OrdersDto> {
    return this.repository.get(query.filters);
  }
}
