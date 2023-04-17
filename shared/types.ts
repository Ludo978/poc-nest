import {
  InputType,
  Field,
  ObjectType,
  createUnionType,
} from '@nestjs/graphql';

export type SortType = 'asc' | 'desc';

@InputType()
export class DateInputDto {
  @Field({ nullable: true })
  readonly gte?: Date;

  @Field({ nullable: true })
  readonly lte?: Date;

  @Field({ nullable: true })
  readonly gt?: Date;

  @Field({ nullable: true })
  readonly lt?: Date;
}

@InputType()
export class PaginationInputDto {
  @Field()
  readonly take: number;

  @Field({ nullable: true })
  readonly cursor?: string;
}

@InputType()
export class SortInputDto {
  @Field({ nullable: true })
  readonly createdAt?: SortType;

  @Field({ nullable: true })
  readonly updatedAt?: SortType;
}

@InputType()
export class FilterInputDto {
  @Field({ nullable: true })
  readonly mine?: boolean;

  @Field({ nullable: true })
  readonly pagination?: PaginationInputDto;

  @Field({ nullable: true })
  readonly orderBy?: SortInputDto;
}

@ObjectType()
export class GraphqlError {
  @Field()
  readonly success!: boolean;

  @Field()
  readonly message!: string;

  @Field()
  readonly code!: number;
}

@ObjectType()
export class Success {
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
  types: () => [Success, GraphqlError],
  resolveType: (value) => {
    if (value.success === true) return Success;
    return GraphqlError;
  },
});
