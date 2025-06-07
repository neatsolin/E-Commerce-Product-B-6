import { Product } from "../Product/Product";
import { DeliveryOption } from "../Product/DeliveryOption";
export 
class CartItem {
  constructor(
    public product: Product,
    public quantity: number,
    public deliveryOption: DeliveryOption
  ) {}

  getItemTotal(): number {
    return this.product.price * this.quantity;
  }

  getDeliveryCost(): number {
    return this.deliveryOption.price;
  }

  getTotal(): number {
    return this.getItemTotal() + this.getDeliveryCost();
  }
}
