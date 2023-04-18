import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SuccessProduct, GraphqlErrorProduct } from 'src/product/dtos/product.dto';
import { ProductsDto } from '../dtos/product.dto';
import { ProductInputDto, UpdateProductInputDto } from '../inputs/product.input';
import { FilterProductInputDto } from '../inputs/filter.input';
import { GetQuery } from '../queries/impl/get.query';
import { CreateProductCommand } from '../commands/impl/create-product.command';
import { UpdateProductCommand } from '../commands/impl/update-product.command';
import { DeleteProductCommand } from '../commands/impl/delete-product.command';

@Injectable()
export class ProductService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  async create(productInput: ProductInputDto, creatorId: string): Promise<SuccessProduct | GraphqlErrorProduct> {
    return this.commandBus.execute(new CreateProductCommand(productInput, creatorId));
  }

  async get(filters: FilterProductInputDto): Promise<ProductsDto> {
    return this.queryBus.execute(new GetQuery(filters));
  }

  async update(
    productInput: UpdateProductInputDto,
    creatorId: string,
  ): Promise<SuccessProduct | GraphqlErrorProduct> {
    return this.commandBus.execute(new UpdateProductCommand(productInput, creatorId));
  }

  async delete(productId: string, creatorId: string): Promise<SuccessProduct | GraphqlErrorProduct> {
    return this.commandBus.execute(new DeleteProductCommand(productId, creatorId));
  }
}
