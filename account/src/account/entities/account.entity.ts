import { AggregateRoot } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { AccountDto } from '../dtos/account.dto';
import { AccountInputDto, UpdateAccountInputDto } from '../inputs/account.input';
import { AccountCreatedEvent } from '../events/impl/account-created.event';
import { Event } from './event.entity';
import { AccountUpdatedEvent } from '../events/impl/account-updated.event';
import { AccountDeletedEvent } from '../events/impl/account-deleted.event';

@ObjectType()
export class Account extends AggregateRoot {
  [x: string]: any;

  constructor(
    private readonly accountId: string | undefined,
    private readonly prismaService: PrismaService,
  ) {
    super();
    if (accountId) this.id = accountId;
  }

  @Field(() => ID)
    id!: string;

  @Field()
    createdAt?: Date;

  @Field()
    updatedAt?: Date;

  @Field()
    firstname: string;

  @Field()
    lastname: string;

  @Field()
    email: string;

  @Field()
    password: string;

  async init() {
    const account = await this.prismaService.account.findUnique({
      where: {
        id: this.id,
      },
    });
    if (!account) throw new Error('Account not found');
    Object.assign(this, account);
  }

  setDataNewAccount(data: AccountInputDto) {
    Object.assign(this, data);
  }

  async create(creatorAccountId: string) {
    const account = await this.prismaService.account.findFirst({
      where: { email: this.email },
    });
    console.log('account', account);
    if (account) throw new Error('Account already exists');
    console.log('lalalal');
    this.apply(
      new AccountCreatedEvent(
        new Event(
          {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: await bcrypt.hash(this.password, 10),
          },
          creatorAccountId,
        ),
      ),
    );
  }

  async createPersist(data: AccountInputDto): Promise<void> {
    try {
      await this.prismaService.account.create({
        data: {
          id: this.id,
          ...data,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(creatorAccountId: string, data: UpdateAccountInputDto) {
    this.apply(
      new AccountUpdatedEvent(
        new Event(
          {
            id: this.id,
            firstname: data.firstname || this.firstname,
            lastname: data.lastname || this.lastname,
            email: data.email || this.email,
            password: data.password ? await bcrypt.hash(data.password, 10) : this.password,
          },
          creatorAccountId,
        ),
      ),
    );
  }

  async updatePersist(data: AccountDto): Promise<void> {
    try {
      await this.prismaService.account.update({
        where: { id: this.id },
        data,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(creatorAccountId: string) {
    this.apply(
      new AccountDeletedEvent(
        new Event(
          {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          },
          creatorAccountId,
        ),
      ),
    );
  }

  async deletePersist(): Promise<void> {
    try {
      await this.prismaService.account.delete({ where: { id: this.id } });
    } catch (e) {
      throw new Error(e);
    }
  }
}

@ObjectType()
export class Accounts {
  @Field(() => [Account])
    accounts: Account[];

  @Field()
    count: number;
}
