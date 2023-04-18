import { ICommand } from '@nestjs/cqrs';
import { UpdateOrderInputDto } from '../../inputs/order.input';

export class UpdateOrderCommand implements ICommand {
  constructor(
    public readonly orderInput: UpdateOrderInputDto,
    public readonly creatorId: string,
  ) {}
}
