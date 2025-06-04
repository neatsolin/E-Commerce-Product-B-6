import { Customer } from '../Customer/Customer';
import { CartItem } from './CartItem';




export class Cart {
  customer: Customer;
  items: CartItem[];

  constructor(customer: Customer) {
    this.customer = customer;
    this.items = [];
  }

  addItem(item: CartItem): void {
    const existingItem = this.items.find(i => i.product.name === item.product.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(productName: string): void {
    this.items = this.items.filter(item => item.product.name !== productName);
  }

  updateItemQuantity(productName: string, quantity: number): void {
    const item = this.items.find(i => i.product.name === productName);
    if (item) {
      item.quantity = quantity;
    }
  }
}