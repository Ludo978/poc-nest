import { AccountCreatedHandler } from './account-created.handler';
import { AccountDeletedHandler } from './account-deleted.handler';
import { AccountUpdatedHandler } from './account-updated.handler';

export const EventHandlers = [
  AccountCreatedHandler,
  AccountUpdatedHandler,
  AccountDeletedHandler,
];
