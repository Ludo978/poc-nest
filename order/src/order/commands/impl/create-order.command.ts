import { ICommand } from '@nestjs/cqrs';
import { OrderInputDto } from '../../inputs/order.input';

export class CreateOrderCommand implements ICommand {
  constructor(
    public readonly orderInput: OrderInputDto,
    public readonly creatorId: string,
  ) {}
}
