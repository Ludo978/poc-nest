import { AccountCreatedHandler } from './account-created.handler';
import { AccountDeletedHandler } from './account-deleted.handler';
import { AccountUpdatedHandler } from './account-updated.handler';
import { OrderCreatedHandler } from './order-created.handler';
import { OrderDeletedHandler } from './order-deleted.handler';

export const EventHandlers = [
  AccountCreatedHandler,
  AccountUpdatedHandler,
  AccountDeletedHandler,
  OrderCreatedHandler,
  OrderDeletedHandler,
];
