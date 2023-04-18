import { ProductDto } from '../dtos/product.dto';

export class Event {
  constructor(object: ProductDto, creatorAccountId: string) {
    this.object = object;
    this.creatorAccountId = creatorAccountId;
  }

  creatorAccountId!: string;

  object: ProductDto;
}
