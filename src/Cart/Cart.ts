import { CartItem } from "./CartItem";
import { Product } from "../Product/Product";
import { DeliveryOption } from "../Product/DeliveryOption";

export class Cart {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  addItem(product: Product, quantity: number, deliveryOption?: DeliveryOption): void {
    this.items.push(new CartItem(product, quantity, deliveryOption));
  }
  // ... other methods
}