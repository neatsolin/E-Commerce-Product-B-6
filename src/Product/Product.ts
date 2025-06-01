import { Category } from './ProductCategory';
import { Seller } from '../Customer/Seller';
import { Review } from './Review';

export class Product {
  productName: string;
  category: Category;
  price: number;
  stockQuantity: number;
  discount: number | null;
  seller: Seller;
  reviews: Review[];

  constructor(productName: string, category: Category, price: number, stockQuantity: number, seller: Seller, discount?: number) {
    if (price <= 0) throw new Error('Price must be positive');
    if (stockQuantity < 0) throw new Error('Stock quantity cannot be negative');
    this.productName = productName;
    this.category = category;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.discount = discount || null;
    this.seller = seller;
    this.reviews = [];
    this.seller.addProduct(this);
  }
}