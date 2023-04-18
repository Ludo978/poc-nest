import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
} from '@nestjs/graphql';
import { Accounts } from '../entities/account.entity';
import { AccountService } from '../services/account.service';
import { AccountInputDto, LoginInputDto, UpdateAccountInputDto } from '../inputs/account.input';
import { FilterAccountInputDto } from '../inputs/filter.input';
import {
  AccountsDto,
  AuthPayloadOrErrorUnion,
  TokenPayloadDto,
  SuccessOrErrorUnion,
} from '../dtos/account.dto';

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

  @Query(() => Accounts)
  getAccounts(
    @Args('filters', { nullable: true }) filters: FilterAccountInputDto,
  ): Promise<AccountsDto> {
    return this.accountService.get(filters);
  }

  @Mutation(() => SuccessOrErrorUnion)
  async createAccount(
    @Args('account') account: AccountInputDto,
      @Context('userId') userId: string,
  ): Promise<typeof SuccessOrErrorUnion> {
    return this.accountService.create(account, userId);
  }

  @Mutation(() => SuccessOrErrorUnion)
  async updateAccount(
    @Args('account') account: UpdateAccountInputDto,
      @Context('userId') userId: string,
  ): Promise<typeof SuccessOrErrorUnion> {
    return this.accountService.update(account, userId);
  }

  @Mutation(() => SuccessOrErrorUnion)
  async deleteAccount(
    @Args('accountId') accountId: string,
      @Context('userId') userId: string,
  ): Promise<typeof SuccessOrErrorUnion> {
    return this.accountService.delete(accountId, userId);
  }

  @Query(() => AuthPayloadOrErrorUnion)
  async login(
    @Args('account') account: LoginInputDto,
  ): Promise<typeof AuthPayloadOrErrorUnion> {
    const rslt = await this.accountService.login(account);
    return rslt;
  }
}
