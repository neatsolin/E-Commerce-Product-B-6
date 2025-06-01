export class DeliveryOption {
  method: string;
  cost: number;

  constructor(method: string, cost: number) {
    if (cost < 0) throw new Error('Delivery cost cannot be negative');
    this.method = method;
    this.cost = cost;
  }
}