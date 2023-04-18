import { InputType, Field } from '@nestjs/graphql';
import { FilterInputDto } from '../../shared/types';

@InputType()
export class QueryProductInputDto {
  @Field(() => [String], { nullable: true })
  readonly ids?: string[];
}

@InputType()
export class FilterProductInputDto extends FilterInputDto {
  @Field({ nullable: true })
  readonly query?: QueryProductInputDto;
}
export const filtersObjectFromFilters = (filters?: FilterProductInputDto) => {
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
