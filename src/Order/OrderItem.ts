import { Product } from "../Product/Product";

export class OrderItem {
  orderItemId: string;
  product: Product;
  quantity: number;

  constructor(orderItemId: string, product: Product, quantity: number) {
    this.orderItemId = orderItemId;
    this.product = product;
    this.quantity = quantity;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getQuantity(): number {
    return this.quantity;
  }
}
