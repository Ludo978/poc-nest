import { CreateAccountHandler } from './create-account.handler';
import { DeleteAccountHandler } from './delete-account.handler';
import { UpdateAccountHandler } from './update-account.handler';

export const CommandHandlers = [
  CreateAccountHandler,
  UpdateAccountHandler,
  DeleteAccountHandler,
];
