import { Address } from './Address';
import { Order } from '../Order/Order';
import { Review } from '../Product/Review';
import { Product } from '../Product/Product';
import { Refund } from '../Order/Refund';
import { Notification } from '../Common/Notification';
import { calculateTotal } from '../Common/utils';
import { Cart } from '../Cart/Cart';

export class Customer {
  phoneNumber: string;
  address: Address;
  orders: Order[];
  cart: Cart;
  reviews: Review[];
  customerId: string;

  constructor(phoneNumber: string, address: Address,customerId: string) {
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.orders = [];
    this.cart = new Cart(this);
    this.reviews = [];
    this.customerId = customerId
  }

  // User Story 1: View total order price including discounts and delivery fees
  getOrderTotal(order: Order): number {
    const itemsTotal = calculateTotal(order.orderItems, 'price', 'quantity', 'discount');
    const deliveryCost = order.deliveryOption ? order.deliveryOption.cost : 0;
    return itemsTotal + deliveryCost;
  }

  // User Story 5: Cancel one item in my order and get a refund
  cancelOrderItem(order: Order, productName: string): Refund | null {
    const itemIndex = order.orderItems.findIndex(item => item.product.productName === productName);
    if (itemIndex === -1) return null;

    const item = order.orderItems[itemIndex];
    if (order.shipments.length > 0) {
      new Notification('Cannot cancel item: Order already shipped', this.phoneNumber).send();
      return null;
    }

    order.orderItems.splice(itemIndex, 1);
    const refundAmount = item.product.price * item.quantity - (item.product.discount || 0);
    item.product.stockQuantity += item.quantity;
    item.product.seller.productStock[item.product.productName] = item.product.stockQuantity;
    new Notification(`Item ${productName} cancelled. Refund of ${refundAmount} processed`, this.phoneNumber).send();
    return new Refund(order, refundAmount, `Refund for ${productName}`);
  }

  // User Story 6: Review a product after delivery
  addReview(product: Product, rating: number, comment: string): Review {
    if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5');
    const hasOrdered = this.orders.some(order => 
      order.orderItems.some(item => item.product.productName === product.productName)
    );
    if (!hasOrdered) throw new Error('Cannot review a product you have not purchased');
    const review = new Review(this, product, rating, comment);
    this.reviews.push(review);
    product.reviews.push(review);
    new Notification(`Thank you for reviewing ${product.productName}!`, this.phoneNumber).send();
    return review;
  }
}