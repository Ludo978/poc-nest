import { Field, ObjectType, createUnionType } from '@nestjs/graphql';

export type AccountDto = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  ordersId: string[];
};

export type AccountsDto = {
  accounts: AccountDto[];
  count?: number;
};

@ObjectType()
export class AuthPayloadDto {
  @Field()
    token: string;
}

@ObjectType()
export class GraphqlErrorAccount {
  @Field()
  readonly success!: boolean;

  @Field()
  readonly message!: string;

  @Field()
  readonly code!: number;
}

@ObjectType()
export class SuccessAccount {
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
  types: () => [SuccessAccount, GraphqlErrorAccount],
  resolveType: (value) => {
    if (value.success === true) return SuccessAccount;
    return GraphqlErrorAccount;
  },
});

export const AuthPayloadOrErrorUnion = createUnionType({
  name: 'AuthPayloadOrErrorUnion',
  types: () => [AuthPayloadDto, GraphqlErrorAccount],
  resolveType: (value) => {
    if (value.token) return AuthPayloadDto;
    return GraphqlErrorAccount;
  },
});
