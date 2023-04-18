import { ICommand } from '@nestjs/cqrs';
import { UpdateProductInputDto } from '../../inputs/product.input';

export class UpdateProductCommand implements ICommand {
  constructor(
    public readonly productInput: UpdateProductInputDto,
    public readonly creatorId: string,
  ) {}
}
