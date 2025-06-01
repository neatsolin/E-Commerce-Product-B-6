import { Order } from '../Order/Order';
import { Product } from '../Product/Product';
import { Notification } from '../Common/Notification';

export class Seller {
  productStock: { [productName: string]: number };

  constructor() {
    this.productStock = {};
  }

  // User Story 4: System admin wants to know how many products are in stock for each seller
  getProductStock(): { [productName: string]: number } {
    return { ...this.productStock };
  }

  // User Story 2: Seller wants to view all orders that include their products
  getOrdersBySeller(orders: Order[]): Order[] {
    const sellerOrders = orders.filter(order => 
      order.orderItems.some(item => item.product.seller === this)
    );
    if (sellerOrders.length > 0) {
      new Notification(`You have ${sellerOrders.length} orders to fulfill`, 'seller@example.com').send();
    }
    return sellerOrders;
  }

  addProduct(product: Product): void {
    this.productStock[product.productName] = product.stockQuantity;
  }
}