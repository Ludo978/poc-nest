import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrderInputDto {
  @Field()
  readonly accountId: string;

  @Field(() => [String])
  readonly productsId: string[];
}

@InputType()
export class UpdateOrderInputDto {
  @Field()
  readonly id: string;

  @Field({ nullable: true })
  readonly accountId?: string;

  @Field(() => [String], { nullable: true })
  readonly productsId?: string[];
}
