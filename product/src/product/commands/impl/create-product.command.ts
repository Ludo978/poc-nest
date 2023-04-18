import { ICommand } from '@nestjs/cqrs';
import { ProductInputDto } from '../../inputs/product.input';

export class CreateProductCommand implements ICommand {
  constructor(
    public readonly productInput: ProductInputDto,
    public readonly creatorId: string,
  ) {}
}
