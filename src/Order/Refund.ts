import { Order } from "./Order";
import { Payment } from "../Payment/Payment";
import { Customer } from "../Customer/Customer";


export class Refund {
  private refundId: string;
  private order: Order;
  private reason: string;
  private payment: Payment;
  private amount: number;
  private approved: boolean;
  private requestDate: Date;

  constructor(
    refundId: string,
    order: Order,
    reason: string,
    payment: Payment,
    amount: number,
    approved: boolean,
    requestDate: Date
  ) {
    this.refundId = refundId;
    this.order = order;
    this.reason = reason;
    this.payment = payment;
    this.amount = amount;
    this.approved = approved;
    this.requestDate= requestDate;
  }

  public processRefund(): boolean {
    return false;
  }

  public notifyCustomer(): void {}
}
