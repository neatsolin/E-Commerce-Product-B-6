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


// === Function to Generate IDs ===
function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${randomStr}`;
}

import { User } from "./Auth/User";

console.log("=== User Test: solin ===");
const user1 = new User("solin", "solin@solin.com", "userpass", "Street A");
user1.register("solin@solin.com", "userpass");
user1.login("solin@solin.com", "wrongpass");
user1.logout();

console.log("\n=== User Test: ya ===");
const user2 = new User("ya", "ya@ya.com", "yapass", "Street Y");
user2.register("ya@ya.com", "yapass");
user2.login("ya@ya.com", "yapass");
user2.logout();

console.log("\n=== User Test: khouerm ===");
const user3 = new User("khouerm", "khouerm@khouerm.com", "khoupass", "Street K");
user3.register("khouerm@khouerm.com", "khoupass");
user3.login("khouerm@khouerm.com", "wrong");
user3.login("khouerm@khouerm.com", "khoupass");
user3.logout();

console.log("\n=== User Test: kartrork ===");
const user4 = new User("kartrork", "kartrork@kartrork.com", "kartpass", "Street Z");
user4.register("kartrork@kartrork.com", "kartpass");
user4.login("wrong@kartrork.com", "kartpass");
user4.login("kartrork@kartrork.com", "kartpass");
user4.logout();



