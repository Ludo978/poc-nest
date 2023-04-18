import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductsDto } from 'src/product/dtos/product.dto';
import { GetQuery } from '../impl/get.query';
import { ProductRepository } from '../../repository/product.repository';

@QueryHandler(GetQuery)
export class GetHandler
implements IQueryHandler<GetQuery> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(query: GetQuery): Promise<ProductsDto> {
    return this.repository.get(query.filters);
  }
}
