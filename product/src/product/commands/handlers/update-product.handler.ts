import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SuccessProduct, GraphqlErrorProduct } from 'src/product/dtos/product.dto';
import { UpdateProductCommand } from '../impl/update-product.command';
import { ProductRepository } from '../../repository/product.repository';
import {
  successBuilder,
  graphqlErrorBuilder,
  SuccessEnum,
  ErrorEnum,
} from '../../entities/utils.entity';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
implements ICommandHandler<UpdateProductCommand> {
  constructor(
    private readonly repository: ProductRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(
    command: UpdateProductCommand,
  ): Promise<SuccessProduct | GraphqlErrorProduct> {
    const { productInput, creatorId } = command;
    Logger.log(`${creatorId} updated ${productInput.id}`, 'UpdateProductCommand');
    try {
      const product = this.publisher.mergeObjectContext(
        await this.repository.update(productInput, creatorId),
      );
      product.commit();
      return successBuilder(SuccessEnum.PRODUCT_UPDATED, productInput.id);
    } catch (e) {
      return graphqlErrorBuilder(ErrorEnum.ERROR);
    }
  }
}
