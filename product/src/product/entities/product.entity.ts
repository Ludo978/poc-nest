import { AggregateRoot } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductDto } from '../dtos/product.dto';
import { ProductInputDto, UpdateProductInputDto } from '../inputs/product.input';
import { ProductCreatedEvent } from '../events/impl/product-created.event';
import { Event } from './event.entity';
import { ProductUpdatedEvent } from '../events/impl/product-updated.event';
import { ProductDeletedEvent } from '../events/impl/product-deleted.event';

@ObjectType()
export class Product extends AggregateRoot {
  [x: string]: any;

  constructor(
    private readonly productId: string | undefined,
    private readonly prismaService: PrismaService,
  ) {
    super();
    if (productId) this.id = productId;
  }

  @Field(() => ID)
    id!: string;

  @Field()
    createdAt?: Date;

  @Field()
    updatedAt?: Date;

  @Field()
    name: string;

  @Field()
    description: string;

  @Field()
    price: number;

  @Field()
    image: string;

  async init() {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: this.id,
      },
    });
    if (!product) throw new Error('Product not found');
    Object.assign(this, product);
  }

  setDataNewProduct(data: ProductInputDto) {
    Object.assign(this, data);
  }

  async create(creatorAccountId: string) {
    this.apply(
      new ProductCreatedEvent(
        new Event(
          {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
          },
          creatorAccountId,
        ),
      ),
    );
  }

  async createPersist(data: ProductInputDto): Promise<void> {
    try {
      await this.prismaService.product.create({
        data: {
          id: this.id,
          ...data,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(creatorAccountId: string, data: UpdateProductInputDto) {
    this.apply(
      new ProductUpdatedEvent(
        new Event(
          {
            id: this.id,
            name: data.name || this.name,
            description: data.description || this.description,
            price: data.price || this.price,
            image: data.image || this.image,
          },
          creatorAccountId,
        ),
      ),
    );
  }

  async updatePersist(data: ProductDto): Promise<void> {
    try {
      await this.prismaService.product.update({
        where: { id: this.id },
        data,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(creatorAccountId: string) {
    this.apply(
      new ProductDeletedEvent(
        new Event(
          {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
          },
          creatorAccountId,
        ),
      ),
    );
  }

  async deletePersist(): Promise<void> {
    try {
      await this.prismaService.product.delete({ where: { id: this.id } });
    } catch (e) {
      throw new Error(e);
    }
  }
}

@ObjectType()
export class Products {
  @Field(() => [Product])
    products: Product[];

  @Field()
    count: number;
}
