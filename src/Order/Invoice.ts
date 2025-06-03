import { Order } from "../Order/Order";
import { Customer } from "../Customer/Customer";

export class Invoice {
  private invoiceId: string;
  private order: Order;
  private customer: Customer;
  private totalAmount: number;

  constructor(
    invoiceId: string,
    order: Order,
    customer: Customer,
    totalAmount: number
  ) {
    this.invoiceId = invoiceId;
    this.order = order;
    this.customer = customer;
    this.totalAmount = totalAmount;
  }

  public generateInvoice(): void {}
}
