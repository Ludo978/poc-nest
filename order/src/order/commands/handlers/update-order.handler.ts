import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SuccessOrder, GraphqlErrorOrder } from 'src/order/dtos/order.dto';
import { UpdateOrderCommand } from '../impl/update-order.command';
import { OrderRepository } from '../../repository/order.repository';
import {
  successBuilder,
  graphqlErrorBuilder,
  SuccessEnum,
  ErrorEnum,
} from '../../entities/utils.entity';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler
implements ICommandHandler<UpdateOrderCommand> {
  constructor(
    private readonly repository: OrderRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(
    command: UpdateOrderCommand,
  ): Promise<SuccessOrder | GraphqlErrorOrder> {
    const { orderInput, creatorId } = command;
    Logger.log(`${creatorId} updated ${orderInput.id}`, 'UpdateOrderCommand');
    try {
      const order = this.publisher.mergeObjectContext(
        await this.repository.update(orderInput, creatorId),
      );
      order.commit();
      return successBuilder(SuccessEnum.ORDER_UPDATED, orderInput.id);
    } catch (e) {
      return graphqlErrorBuilder(ErrorEnum.ERROR);
    }
  }
}
