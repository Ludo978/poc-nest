import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GraphqlError } from 'src/shared/types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountsDto, AuthPayloadDto } from '../dtos/account.dto';
import { Account } from '../entities/account.entity';
import { AccountInputDto, LoginInputDto, UpdateAccountInputDto } from '../inputs/account.input';
import { FilterAccountInputDto, filtersObjectFromFilters } from '../inputs/filter.input';
import { Event } from '../entities/event.entity';

@Injectable()
export class AccountRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async create(
    accountInput: AccountInputDto,
    id: string,
    creatorAccountId: string,
  ) {
    const account = new Account(id, this.prismaService);
    console.log('1');
    account.setDataNewAccount(accountInput);
    console.log('2');
    await account.create(creatorAccountId);
    console.log('3', account.id);
    return account;
  }

  async createPersist(event: Event) {
    const account = new Account(event.object.id, this.prismaService);
    await account.createPersist(event.object);
  }

  async update(
    accountInput: UpdateAccountInputDto,
    creatorAccountId: string,
  ): Promise<Account> {
    const account = new Account(accountInput.id, this.prismaService);
    await account.init();
    await account.update(creatorAccountId, accountInput);
    return account;
  }

  async updatePersist(event: Event): Promise<Account> {
    const account = new Account(event.object.id, this.prismaService);
    await account.updatePersist(event.object);
    return account;
  }

  async delete(id: string, creatorAccountId: string): Promise<Account> {
    const account = new Account(id, this.prismaService);
    await account.init();
    await account.delete(creatorAccountId);
    return account;
  }

  async deletePersist(event: Event): Promise<Account> {
    const account = new Account(event.object.id, this.prismaService);
    await account.deletePersist();
    return account;
  }

  async get(filters?: FilterAccountInputDto): Promise<AccountsDto> {
    const { query, ...rest } = filtersObjectFromFilters(filters);
    const count = await this.prismaService.account.count({
      where: { ...query },
    });
    const accounts = await this.prismaService.account.findMany({
      where: { ...query },
      ...rest,
    });
    return { accounts, count };
  }

  async login(input: LoginInputDto): Promise<AuthPayloadDto | GraphqlError> {
    const account = await this.prismaService.account.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!account) throw new Error('Account not found');
    const passwordMatch = await bcrypt.compare(input.password, account.password);
    if (!passwordMatch) throw new Error('Password does not match');

    const token = this.jwtService.sign(
      { id: account.id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1y',
      },
    );

    return { token };
  }
}
