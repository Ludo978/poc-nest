import { OrderCreatedHandler } from './order-created.handler';
import { OrderDeletedHandler } from './order-deleted.handler';
import { OrderUpdatedHandler } from './order-updated.handler';

export const EventHandlers = [
  OrderCreatedHandler,
  OrderUpdatedHandler,
  OrderDeletedHandler,
];
