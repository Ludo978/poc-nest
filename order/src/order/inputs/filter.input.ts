import { InputType, Field } from '@nestjs/graphql';
import { FilterInputDto } from '../../shared/types';

@InputType()
export class QueryOrderInputDto {
  @Field(() => [String], { nullable: true })
  readonly ids?: string[];

  @Field({ nullable: true })
  readonly accountId?: string;
}

@InputType()
export class FilterOrderInputDto extends FilterInputDto {
  @Field({ nullable: true })
  readonly query?: QueryOrderInputDto;
}
export const filtersObjectFromFilters = (filters?: FilterOrderInputDto) => {
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
