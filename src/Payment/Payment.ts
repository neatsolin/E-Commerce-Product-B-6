class Payment {
  id: number;
  orderId: number;
  amount: number;
  method: string;
  status: string;

  constructor(id: number, orderId: number, amount: number, method: string) {
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
    this.method = method;
    this.status = "pending";
  }

  processPayment(): void {
    this.status = "completed";
  }

  refund(): void {
    this.status = "refunded";
  }
}

export { Payment };