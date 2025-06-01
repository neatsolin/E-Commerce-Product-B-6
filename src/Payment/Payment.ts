import { Order } from '../Order/Order';
import { PaymentGateway } from './PaymentGateway';
import { Notification } from '../Common/Notification';
import { Invoice } from '../Order/Invoice';


export class Payment {
  order: Order;
  amount: number;
  method: string;
  status: string;
  gateway: PaymentGateway;

  constructor(order: Order, amount: number, method: string) {
    this.order = order;
    this.amount = amount;
    this.method = method;
    this.status = 'pending';
    this.gateway = new PaymentGateway();
  }

  processPayment(): boolean {
    const success = this.gateway.process(this.order, this.amount, this.method);
    this.status = success ? 'completed' : 'failed';
    if (success) {
      this.order.invoice = new Invoice(this.order, this.amount);
      new Notification(`Payment of ${this.amount} for order ${this.order.orderNumber} successful`, this.order.customer.phoneNumber).send();
    } else {
      new Notification(`Payment failed for order ${this.order.orderNumber}`, this.order.customer.phoneNumber).send();
    }
    return success;
  }
}