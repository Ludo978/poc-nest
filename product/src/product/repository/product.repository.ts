import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';
import { ProductInputDto, UpdateProductInputDto } from '../inputs/product.input';
import { FilterProductInputDto, filtersObjectFromFilters } from '../inputs/filter.input';
import { Event } from '../entities/event.entity';

@Injectable()
export class ProductRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(
    productInput: ProductInputDto,
    id: string,
    creatorProductId: string,
  ) {
    const product = new Product(id, this.prismaService);
    product.setDataNewProduct(productInput);
    await product.create(creatorProductId);
    return product;
  }

  async createPersist(event: Event) {
    const product = new Product(event.object.id, this.prismaService);
    await product.createPersist(event.object);
  }

  async update(
    productInput: UpdateProductInputDto,
    creatorProductId: string,
  ): Promise<Product> {
    const product = new Product(productInput.id, this.prismaService);
    await product.init();
    await product.update(creatorProductId, productInput);
    return product;
  }

  async updatePersist(event: Event): Promise<Product> {
    const product = new Product(event.object.id, this.prismaService);
    await product.updatePersist(event.object);
    return product;
  }

  async delete(id: string, creatorProductId: string): Promise<Product> {
    const product = new Product(id, this.prismaService);
    await product.init();
    await product.delete(creatorProductId);
    return product;
  }

  async deletePersist(event: Event): Promise<Product> {
    const product = new Product(event.object.id, this.prismaService);
    await product.deletePersist();
    return product;
  }

  async get(filters?: FilterProductInputDto): Promise<ProductsDto> {
    const { query, ...rest } = filtersObjectFromFilters(filters);
    const count = await this.prismaService.product.count({
      where: { ...query },
    });
    const products = await this.prismaService.product.findMany({
      where: { ...query },
      ...rest,
    });
    return { products, count };
  }
}
