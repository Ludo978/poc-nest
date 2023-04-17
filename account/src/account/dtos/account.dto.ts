import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { GraphqlError } from 'src/shared/types';

export type AccountDto = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
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

export const AuthPayloadOrErrorUnion = createUnionType({
  name: 'AuthPayloadOrErrorUnion',
  types: () => [AuthPayloadDto, GraphqlError],
  resolveType: (value) => {
    if (value.token) return AuthPayloadDto;
    return GraphqlError;
  },
});
