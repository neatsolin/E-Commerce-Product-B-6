import { Product } from './Product';

export class Category {
  categoryName: string;

  constructor(categoryName: string) {
    this.categoryName = categoryName;
  }

  getProductsInCategory(products: Product[]): Product[] {
    return products.filter(product => product.category === this);
  }
}