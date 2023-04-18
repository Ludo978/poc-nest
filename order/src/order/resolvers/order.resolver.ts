import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
} from '@nestjs/graphql';
import { Orders } from '../entities/order.entity';
import { OrderService } from '../services/order.service';
import { OrderInputDto, UpdateOrderInputDto } from '../inputs/order.input';
import { FilterOrderInputDto } from '../inputs/filter.input';
import { OrdersDto, SuccessOrErrorUnion } from '../dtos/order.dto';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) { }

  @Query(() => Orders)
  getOrders(
    @Args('filters', { nullable: true }) filters: FilterOrderInputDto,
  ): Promise<OrdersDto> {
    return this.orderService.get(filters);
  }

  @Mutation(() => SuccessOrErrorUnion)
  async createOrder(
    @Args('order') order: OrderInputDto,
      @Context('userId') userId: string,
  ): Promise<typeof SuccessOrErrorUnion> {
    return this.orderService.create(order, userId);
  }

  @Mutation(() => SuccessOrErrorUnion)
  async updateOrder(
    @Args('order') order: UpdateOrderInputDto,
      @Context('userId') userId: string,
  ): Promise<typeof SuccessOrErrorUnion> {
    return this.orderService.update(order, userId);
  }

  @Mutation(() => SuccessOrErrorUnion)
  async deleteOrder(
    @Args('orderId') orderId: string,
      @Context('userId') userId: string,
  ): Promise<typeof SuccessOrErrorUnion> {
    return this.orderService.delete(orderId, userId);
  }
}
