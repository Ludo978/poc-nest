import { AggregateRoot } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OrderDto } from '../dtos/order.dto';
import { OrderInputDto, UpdateOrderInputDto } from '../inputs/order.input';
import { OrderCreatedEvent } from '../events/impl/order-created.event';
import { Event } from './event.entity';
import { OrderUpdatedEvent } from '../events/impl/order-updated.event';
import { OrderDeletedEvent } from '../events/impl/order-deleted.event';

@ObjectType()
export class Order extends AggregateRoot {
  [x: string]: any;

  constructor(
    private readonly orderId: string | undefined,
    private readonly prismaService: PrismaService,
  ) {
    super();
    if (orderId) this.id = orderId;
  }

  @Field(() => ID)
    id!: string;

  @Field()
    createdAt?: Date;

  @Field()
    updatedAt?: Date;

  @Field()
    accountId: string;

  @Field(() => [String])
    productsId: string[];

  async init() {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: this.id,
      },
    });
    if (!order) throw new Error('Order not found');
    Object.assign(this, order);
  }

  setDataNewOrder(data: OrderInputDto) {
    Object.assign(this, data);
  }

  async create(creatorAccountId: string) {
    this.apply(
      new OrderCreatedEvent(
        new Event(
          {
            id: this.id,
            accountId: this.accountId,
            productsId: this.productsId,
          },
          creatorAccountId,
        ),
      ),
    );
  }

  async createPersist(data: OrderInputDto): Promise<void> {
    try {
      await this.prismaService.order.create({
        data: {
          id: this.id,
          ...data,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(creatorAccountId: string, data: UpdateOrderInputDto) {
    this.apply(
      new OrderUpdatedEvent(
        new Event(
          {
            id: this.id,
            accountId: data.accountId || this.accountId,
            productsId: data.productsId || this.productsId,
          },
          creatorAccountId,
        ),
      ),
    );
  }

  async updatePersist(data: OrderDto): Promise<void> {
    try {
      await this.prismaService.order.update({
        where: { id: this.id },
        data,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(creatorAccountId: string) {
    this.apply(
      new OrderDeletedEvent(
        new Event(
          {
            id: this.id,
            accountId: this.accountId,
            productsId: this.productsId,
          },
          creatorAccountId,
        ),
      ),
    );
  }

  async deletePersist(): Promise<void> {
    try {
      await this.prismaService.order.delete({ where: { id: this.id } });
    } catch (e) {
      throw new Error(e);
    }
  }
}

@ObjectType()
export class Orders {
  @Field(() => [Order])
    orders: Order[];

  @Field()
    count: number;
}
