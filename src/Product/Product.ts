class Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
  discount?: number;
  sellerId: number;

  constructor(id: number, name: string, category: string, price: number, stockQuantity: number, sellerId: number, discount?: number) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.discount = discount;
    this.sellerId = sellerId;
  }
}

export { Product };