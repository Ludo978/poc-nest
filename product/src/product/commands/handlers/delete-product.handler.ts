import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SuccessProduct, GraphqlErrorProduct } from 'src/product/dtos/product.dto';
import { DeleteProductCommand } from '../impl/delete-product.command';
import { ProductRepository } from '../../repository/product.repository';
import {
  successBuilder,
  graphqlErrorBuilder,
  SuccessEnum,
  ErrorEnum,
} from '../../entities/utils.entity';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
implements ICommandHandler<DeleteProductCommand> {
  constructor(
    private readonly repository: ProductRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(
    command: DeleteProductCommand,
  ): Promise<SuccessProduct | GraphqlErrorProduct> {
    const { productId, creatorId } = command;
    Logger.log(`${creatorId} deleted ${productId}`, 'DeleteProductCommand');
    try {
      const product = this.publisher.mergeObjectContext(
        await this.repository.delete(productId, productId),
      );
      product.commit();
      return successBuilder(SuccessEnum.PRODUCT_DELETED, productId);
    } catch (e) {
      return graphqlErrorBuilder(ErrorEnum.PRODUCT_NOT_FOUND);
    }
  }
}
