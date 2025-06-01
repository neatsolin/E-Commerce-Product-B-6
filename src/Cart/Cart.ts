import { Customer } from '../Customer/Customer';
import { CartItem } from './CartItem';
import { Order } from '../Order/Order';
import { OrderItem } from '../Order/OrderItem';

export class Cart {
  customer: Customer;
  items: CartItem[];

  constructor(customer: Customer) {
    this.customer = customer;
    this.items = [];
  }

  addItem(item: CartItem): void {
    const existingItem = this.items.find(i => i.product.productName === item.product.productName);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(productName: string): void {
    this.items = this.items.filter(item => item.product.productName !== productName);
  }

  checkout(): Order {
    const order = new Order(this.customer);
    this.items.forEach(item => {
      order.orderItems.push(new OrderItem(item.product, item.quantity));
      order.deliveryOption = item.deliveryOption;
      item.product.stockQuantity -= item.quantity;
      item.product.seller.productStock[item.product.productName] = item.product.stockQuantity;
    });
    this.items = [];
    this.customer.orders.push(order);
    return order;
  }
}