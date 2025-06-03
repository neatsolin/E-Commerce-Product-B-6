export class Payment {
  id: number;
  orderId: number;
  amount: number;
  method: string;
  status: string;
  createdAt: Date;
  totalPrice: number;

  constructor(
    id: number,
    orderId: number,
    amount: number,
    method: string,
    totalPrice?: number
  ) {
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
    this.method = method;
    this.status = "pending";
    this.createdAt = new Date();
    this.totalPrice = totalPrice ?? amount;
  }

  processPayment(): void {
    this.status = "completed";
  }

  refund(): void {
    this.status = "refunded";
  }
}

