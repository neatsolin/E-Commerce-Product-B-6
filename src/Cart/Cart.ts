import { CartItem } from "./CartItem";
import { Product } from "../Product/Product";
import { DeliveryOption } from "../Product/DeliveryOption";

export class Cart {
  private items: CartItem[] = [];

  addItem(product: Product, quantity: number, deliveryOption: DeliveryOption): void {
    const existingItem = this.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new CartItem(product, quantity, deliveryOption));
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotalCartCost(): number {
    return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
  }
}