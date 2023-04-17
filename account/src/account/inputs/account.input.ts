import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AccountInputDto {
  @Field()
  readonly firstname: string;

  @Field()
  readonly lastname: string;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}

@InputType()
export class UpdateAccountInputDto {
  @Field()
  readonly id: string;

  @Field({ nullable: true })
  readonly firstname?: string;

  @Field({ nullable: true })
  readonly lastname?: string;

  @Field({ nullable: true })
  readonly email?: string;

  @Field({ nullable: true })
  readonly password?: string;
}

@InputType()
export class LoginInputDto {
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}
