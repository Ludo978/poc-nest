import { Field, ObjectType, createUnionType } from '@nestjs/graphql';

export type OrderDto = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  accountId: string;
  productsId: string[];
};

export type OrdersDto = {
  orders: OrderDto[];
  count?: number;
};

@ObjectType()
export class GraphqlErrorOrder {
  @Field()
  readonly success!: boolean;

  @Field()
  readonly message!: string;

  @Field()
  readonly code!: number;
}

@ObjectType()
export class SuccessOrder {
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
  types: () => [SuccessOrder, GraphqlErrorOrder],
  resolveType: (value) => {
    if (value.success === true) return SuccessOrder;
    return GraphqlErrorOrder;
  },
});
