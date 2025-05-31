import { DeliveryOption } from "./Product/DeliveryOption";
import { Product } from "./Product/Product";
import { ProductCategory } from "./Product/ProductCategory";
import { Review } from "./Product/Review";
import { Payment } from "./Payment/Payment";

class Main {
  private deliveryOptions: DeliveryOption[] = [
    new DeliveryOption(1, "Standard", 5.99),
    new DeliveryOption(2, "Express", 12.99),
    new DeliveryOption(3, "Same-Day", 19.99),
  ];

  private productCategories: ProductCategory[] = [
    new ProductCategory(1, "Clothing"),
    new ProductCategory(2, "Electronics"),
    new ProductCategory(3, "Accessories"),
  ];

  private products: Product[] = [
    new Product(1, "T-Shirt", "Clothing", 19.99, 50, 1, 2.0),
    new Product(2, "Laptop Stand", "Electronics", 29.99, 30, 2),
    new Product(3, "USB Cable", "Accessories", 9.99, 100, 1),
  ];

  private reviews: Review[] = [
    new Review(1, 1, 1, 4, "Great t-shirt, fits well!"),
  ];

  private payments: Payment[] = [new Payment(1, 1, 47.98, "Credit Card")];

  getDeliveryOptions(): DeliveryOption[] {
    return this.deliveryOptions;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductCategories(): ProductCategory[] {
    return this.productCategories;
  }

  getReviews(): Review[] {
    return this.reviews;
  }

  getPayments(): Payment[] {
    return this.payments;
  }
}

const main = new Main();
console.log("Delivery Options:", main.getDeliveryOptions());
console.log("Products:", main.getProducts());
console.log("Categories:", main.getProductCategories());
console.log("Reviews:", main.getReviews());
console.log("Payments:", main.getPayments());
