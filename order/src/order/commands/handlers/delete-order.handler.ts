import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SuccessOrder, GraphqlErrorOrder } from 'src/order/dtos/order.dto';
import { DeleteOrderCommand } from '../impl/delete-order.command';
import { OrderRepository } from '../../repository/order.repository';
import {
  successBuilder,
  graphqlErrorBuilder,
  SuccessEnum,
  ErrorEnum,
} from '../../entities/utils.entity';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler
implements ICommandHandler<DeleteOrderCommand> {
  constructor(
    private readonly repository: OrderRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(
    command: DeleteOrderCommand,
  ): Promise<SuccessOrder | GraphqlErrorOrder> {
    const { orderId, creatorId } = command;
    Logger.log(`${creatorId} deleted ${orderId}`, 'DeleteOrderCommand');
    try {
      const order = this.publisher.mergeObjectContext(
        await this.repository.delete(orderId, orderId),
      );
      order.commit();
      return successBuilder(SuccessEnum.ORDER_DELETED, orderId);
    } catch (e) {
      return graphqlErrorBuilder(ErrorEnum.ORDER_NOT_FOUND);
    }
  }
}
