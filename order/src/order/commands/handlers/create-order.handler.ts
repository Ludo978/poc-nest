import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SuccessOrder, GraphqlErrorOrder } from 'src/order/dtos/order.dto';
import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderRepository } from '../../repository/order.repository';
import {
  successBuilder,
  graphqlErrorBuilder,
  SuccessEnum,
  ErrorEnum,
} from '../../entities/utils.entity';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler
implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly repository: OrderRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(
    command: CreateOrderCommand,
  ): Promise<SuccessOrder | GraphqlErrorOrder> {
    const { orderInput, creatorId } = command;
    const id = uuidv4();
    Logger.log(`${creatorId} created ${id}`, 'CreateOrderCommand');
    try {
      const order = this.publisher.mergeObjectContext(
        await this.repository.create(orderInput, id, creatorId),
      );
      order.commit();
      return successBuilder(SuccessEnum.ORDER_CREATED, id);
    } catch (e) {
      return graphqlErrorBuilder(ErrorEnum.ERROR);
    }
  }
}
