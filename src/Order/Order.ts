export class Order {
  constructor(
    private id: number,
    private customerId: string,
    private items: { productId: number; quantity: number }[],
    private deliveryOptionId: number
  ) {}
  getId(): number {
    return this.id;
  }
  getCustomerId(): string {
    return this.customerId;
  }
  getItems(): { productId: number; quantity: number }[] {
    return [...this.items];
  }
  getDeliveryOptionId(): number {
    return this.deliveryOptionId;
  }
}