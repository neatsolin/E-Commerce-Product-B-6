import { Product } from '../Product/Product';

export class OrderItem {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    if (quantity > product.stockQuantity) throw new Error('Insufficient stock');
    this.product = product;
    this.quantity = quantity;
  }
}
