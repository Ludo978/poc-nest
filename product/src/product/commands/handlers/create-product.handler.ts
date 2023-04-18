import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SuccessProduct, GraphqlErrorProduct } from 'src/product/dtos/product.dto';
import { CreateProductCommand } from '../impl/create-product.command';
import { ProductRepository } from '../../repository/product.repository';
import {
  successBuilder,
  graphqlErrorBuilder,
  SuccessEnum,
  ErrorEnum,
} from '../../entities/utils.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
implements ICommandHandler<CreateProductCommand> {
  constructor(
    private readonly repository: ProductRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(
    command: CreateProductCommand,
  ): Promise<SuccessProduct | GraphqlErrorProduct> {
    const { productInput, creatorId } = command;
    const id = uuidv4();
    Logger.log(`${creatorId} created ${id}`, 'CreateProductCommand');
    try {
      const product = this.publisher.mergeObjectContext(
        await this.repository.create(productInput, id, creatorId),
      );
      product.commit();
      return successBuilder(SuccessEnum.PRODUCT_CREATED, id);
    } catch (e) {
      return graphqlErrorBuilder(ErrorEnum.ERROR);
    }
  }
}
