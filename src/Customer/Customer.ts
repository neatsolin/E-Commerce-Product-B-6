import { User } from "./User";
import { Order } from "../Order/Order";
import { OrderItem } from "../Order/OrderItem";
import { Product } from "../Product/Product";
import { Address } from "./Address";
import { Review } from "../Product/Review";

export class Customer extends User {
  private phoneNumber: number;
  
  constructor(
    username: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: number
  ) {
    super(username, email, password, address);
    this.phoneNumber = phoneNumber;
  }

  public addShippingAddress(address: Address): void {}
  public placeOrder(orderItems: OrderItem[]): Order { return {} as Order; }
  public viewOrderTotal(order: Order): number { return 0; }
  public cancelOrderItem(order: Order, orderItem: OrderItem): void {}
  public leaveReview(product: Product, rating: number, comment: string): Review { return {} as Review; }
}
