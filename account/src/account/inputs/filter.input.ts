import { InputType, Field } from '@nestjs/graphql';
import { FilterInputDto } from '../../shared/types';

@InputType()
export class QueryAccountInputDto {
  @Field({ nullable: true })
  readonly email?: string;

  @Field(() => [String], { nullable: true })
  readonly ids?: string[];
}

@InputType()
export class FilterAccountInputDto extends FilterInputDto {
  @Field({ nullable: true })
  readonly query?: QueryAccountInputDto;
}
export const filtersObjectFromFilters = (filters?: FilterAccountInputDto) => {
  const filtersObject = {
    take: filters?.pagination?.take,
    cursor: undefined,
    skip: undefined,
    query: undefined,
    orderBy: filters?.orderBy,
  };
  if (filters?.pagination?.cursor) {
    filtersObject.cursor = {
      id: filters?.pagination?.cursor,
    };
    filtersObject.skip = 1;
  }

  if (filters?.query) {
    const { ids, ...rest } = filters.query;

    filtersObject.query = {
      ...rest,
      id: { in: ids },
    };
  }
  return filtersObject;
};
