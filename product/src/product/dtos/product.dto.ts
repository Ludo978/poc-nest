import { Field, ObjectType, createUnionType } from '@nestjs/graphql';

export type ProductDto = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type ProductsDto = {
  products: ProductDto[];
  count?: number;
};

@ObjectType()
export class GraphqlErrorProduct {
  @Field()
  readonly success!: boolean;

  @Field()
  readonly message!: string;

  @Field()
  readonly code!: number;
}

@ObjectType()
export class SuccessProduct {
  @Field()
  readonly success!: boolean;

  @Field()
  readonly message!: string;

  @Field()
  readonly id!: string;
}

export type TokenPayloadDto = {
  readonly accountId: string;
};

export const SuccessOrErrorUnion = createUnionType({
  name: 'SuccessOrError',
  types: () => [SuccessProduct, GraphqlErrorProduct],
  resolveType: (value) => {
    if (value.success === true) return SuccessProduct;
    return GraphqlErrorProduct;
  },
});
