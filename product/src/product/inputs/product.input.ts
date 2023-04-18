import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProductInputDto {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly price: number;

  @Field()
  readonly image: string;
}

@InputType()
export class UpdateProductInputDto {
  @Field()
  readonly id: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field({ nullable: true })
  readonly price?: number;

  @Field({ nullable: true })
  readonly image?: string;
}
