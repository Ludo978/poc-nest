import { CreateProductHandler } from './create-product.handler';
import { DeleteProductHandler } from './delete-product.handler';
import { UpdateProductHandler } from './update-product.handler';

export const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
];
