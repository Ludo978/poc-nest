import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { OrderInputDto, UpdateOrderInputDto } from '../inputs/order.input';
import { FilterOrderInputDto, filtersObjectFromFilters } from '../inputs/filter.input';
import { Event } from '../entities/event.entity';

@Injectable()
export class OrderRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(
    orderInput: OrderInputDto,
    id: string,
    creatorAccountId: string,
  ) {
    const order = new Order(id, this.prismaService);
    order.setDataNewOrder(orderInput);
    await order.create(creatorAccountId);
    return order;
  }

  async createPersist(event: Event) {
    const order = new Order(event.object.id, this.prismaService);
    await order.createPersist(event.object);
  }

  async update(
    orderInput: UpdateOrderInputDto,
    creatorAccountId: string,
  ): Promise<Order> {
    const order = new Order(orderInput.id, this.prismaService);
    await order.init();
    await order.update(creatorAccountId, orderInput);
    return order;
  }

  async updatePersist(event: Event): Promise<Order> {
    const order = new Order(event.object.id, this.prismaService);
    await order.updatePersist(event.object);
    return order;
  }

  async delete(id: string, creatorAccountId: string): Promise<Order> {
    const order = new Order(id, this.prismaService);
    await order.init();
    await order.delete(creatorAccountId);
    return order;
  }

  async deletePersist(event: Event): Promise<Order> {
    const order = new Order(event.object.id, this.prismaService);
    await order.deletePersist();
    return order;
  }

  async get(filters?: FilterOrderInputDto): Promise<OrdersDto> {
    const { query, ...rest } = filtersObjectFromFilters(filters);
    const count = await this.prismaService.order.count({
      where: { ...query },
    });
    const orders = await this.prismaService.order.findMany({
      where: { ...query },
      ...rest,
    });
    return { orders, count };
  }
}
