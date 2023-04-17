import { IQuery } from '@nestjs/cqrs';
import { LoginInputDto } from 'src/account/inputs/account.input';

export class LoginQuery implements IQuery {
  constructor(public readonly input: LoginInputDto) {}
}
