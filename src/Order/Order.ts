import { Invoice } from "./Invoice";
import { OrderItem } from "./OrderItem";
import { Payment } from "../Payment/Payment";
import { Shipment } from "./Shipment";
import { Customer } from "../Customer/Customer";

export class Order {
  private orderId: string;
  private customer: Customer;
  private orderItems: OrderItem[];
  private totalPrice: number;
  private deliveryFees: number;
  private status: string;
  private payment: Payment;
  private shipments: Shipment[];
  private invoice: Invoice;

  constructor(
    orderId: string,
    customer: Customer,
    orderItems: OrderItem[],
    totalPrice: number,
    deliveryFees: number,
    status: string,
    payment: Payment,
    shipments: Shipment[],
    invoice: Invoice
  ) {
    this.orderId = orderId;
    this.customer = customer;
    this.orderItems = orderItems;
    this.totalPrice = totalPrice;
    this.deliveryFees = deliveryFees;
    this.status = status;
    this.payment = payment;
    this.shipments = shipments;
    this.invoice = invoice;
  }

  public calculateTotalPrice(): number {
    return 0;
  }

  public getOrderTotal(): number {
    return 0;
  }

  public splitInShipments(): void {}

  public cancelItem(orderItem: OrderItem): void {}
}
