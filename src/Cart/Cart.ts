<<<<<<< HEAD
export class Cart {
  private items: { productId: number; quantity: number }[] = [];
  addItem(productId: number, quantity: number): void {
    const existingItem = this.items.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }
  }
  getItems(): { productId: number; quantity: number }[] {
    return [...this.items];
  }
}
=======
import { User } from '../Auth/User';
import { Product } from '../Product/Product';
import { DeliveryOption } from '../Product/DeliveryOption';
import { CartItem } from './CartItem';
import { OrderItem } from '../Order/OrderItem';

export class Cart {
    cartID: string;
    customer: User;
    items: CartItem[];

    constructor(cartID: string, customer: User) {
        this.cartID = cartID;
        this.customer = customer;
        this.items = [];
    }

    addItem(product: Product, quantity: number, deliveryOption: DeliveryOption): void {
        const cartItem = new CartItem(product, quantity, deliveryOption);
        this.items.push(cartItem);
    }

    removeItem(cartItem: CartItem): void {
        this.items = this.items.filter(item => item !== cartItem);
    }

    getItems(): OrderItem[] {
        return this.items.map((item, index) => new OrderItem(
            `OI-${this.cartID}-${index + 1}`,
            item.product,
            item.quantity,
            // item.deliveryOption!
        ));
    }
}
>>>>>>> 7d34d0464e9c5e1fc28311df7ffafbedb1104b54
