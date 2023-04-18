import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
} from '@nestjs/graphql';
import { Products } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { ProductInputDto, UpdateProductInputDto } from '../inputs/product.input';
import { FilterProductInputDto } from '../inputs/filter.input';
import { ProductsDto, TokenPayloadDto, SuccessOrErrorUnion } from '../dtos/product.dto';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Query(() => Products)
  getProducts(
    @Args('filters', { nullable: true }) filters: FilterProductInputDto,
  ): Promise<ProductsDto> {
    return this.productService.get(filters);
  }

  @Mutation(() => SuccessOrErrorUnion)
  async createProduct(
    @Args('product') product: ProductInputDto,
      @Context('userId') userId: string,
  ): Promise<typeof SuccessOrErrorUnion> {
    return this.productService.create(product, userId);
  }

  @Mutation(() => SuccessOrErrorUnion)
  async updateProduct(
    @Args('product') product: UpdateProductInputDto,
      @Context('userId') userId: string,
  ): Promise<typeof SuccessOrErrorUnion> {
    return this.productService.update(product, userId);
  }

  @Mutation(() => SuccessOrErrorUnion)
  async deleteProduct(
    @Args('productId') productId: string,
      @Context('userId') userId: string,
  ): Promise<typeof SuccessOrErrorUnion> {
    return this.productService.delete(productId, userId);
  }
}
