import { Order } from './Order';

export class Refund {
  order: Order;
  amount: number;
  reason: string;

  constructor(order: Order, amount: number, reason: string) {
    this.order = order;
    this.amount = amount;
    this.reason = reason;
  }
}