import { Customer } from '../Customer/Customer';
import { Product } from './Product';

export class Review {
  customer: Customer;
  product: Product;
  rating: number;
  comment: string;

  constructor(customer: Customer, product: Product, rating: number, comment: string) {
    this.customer = customer;
    this.product = product;
    this.rating = rating;
    this.comment = comment;
  }
}