
import { Order } from './Order';
import { OrderItem } from './OrderItem';

export class Invoice {
  order: Order;
  totalPrice: number;
  orderItems: OrderItem[];
  invoiceNumber: string;

  constructor(order: Order, totalPrice: number) {
    this.order = order;
    this.totalPrice = totalPrice;
    this.orderItems = [...order.orderItems];
    this.invoiceNumber = `INV-${Date.now()}`;
  }
}