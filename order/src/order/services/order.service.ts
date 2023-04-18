import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SuccessOrder, GraphqlErrorOrder } from 'src/order/dtos/order.dto';
import { OrdersDto } from '../dtos/order.dto';
import { OrderInputDto, UpdateOrderInputDto } from '../inputs/order.input';
import { FilterOrderInputDto } from '../inputs/filter.input';
import { GetQuery } from '../queries/impl/get.query';
import { CreateOrderCommand } from '../commands/impl/create-order.command';
import { UpdateOrderCommand } from '../commands/impl/update-order.command';
import { DeleteOrderCommand } from '../commands/impl/delete-order.command';

@Injectable()
export class OrderService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  async create(orderInput: OrderInputDto, creatorId: string): Promise<SuccessOrder | GraphqlErrorOrder> {
    return this.commandBus.execute(new CreateOrderCommand(orderInput, creatorId));
  }

  async get(filters: FilterOrderInputDto): Promise<OrdersDto> {
    return this.queryBus.execute(new GetQuery(filters));
  }

  async update(
    orderInput: UpdateOrderInputDto,
    creatorId: string,
  ): Promise<SuccessOrder | GraphqlErrorOrder> {
    return this.commandBus.execute(new UpdateOrderCommand(orderInput, creatorId));
  }

  async delete(orderId: string, creatorId: string): Promise<SuccessOrder | GraphqlErrorOrder> {
    return this.commandBus.execute(new DeleteOrderCommand(orderId, creatorId));
  }
}
