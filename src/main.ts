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
import { Admin, Customer, Seller, User } from "./Auth/User";
import { registerUser } from "./Auth/Register";
import { loginUser } from "./Auth/Login";
import { logoutUser } from "./Auth/Logout";

// === Test All Roles ===
console.log("=== User Test ===");
const user = new User("UserOne", "user@example.com", "userpass", "Street A");
user.register("user@example.com", "userpass");
user.login("user@example.com", "wrongpass");
user.login("user@example.com", "userpass");  
user.logout();

console.log("\n=== Customer Test ===");
const customer = new Customer("CustomerOne", "cust@example.com", "custpass", "Street B", "098888888");
customer.register("cust@example.com", "custpass");
customer.login("wrong@example.com", "custpass"); 
customer.login("cust@example.com", "custpass");  
customer.logout();

console.log("\n=== Seller Test ===");
const seller = new Seller("SellerOne", "sell@example.com", "sellpass", "Street C", true);
seller.register("sell@example.com", "sellpass");
seller.login("", "");                          
seller.login("sell@example.com", "sellpass");   
seller.logout();


console.log("\n=== Admin Authentication Tests ===");
const admin = new Admin("AdminUser", "admin@example.com", "pass123", "101 Blvd");
console.log("Admin Register:", admin.register("admin.new@example.com", "newpass123") ? "successful" : "failed");
console.log("Admin Login:", admin.login("admin.new@example.com", "newpass123") ? "successful" : "try again");
console.log("Admin Authenticated:", admin.isAuthenticated() ? "successful" : "not authenticated");
admin.logout();
console.log("Admin Logout: successful");
console.log("Admin Authenticated after logout:", admin.isAuthenticated() ? "successful" : "not authenticated");

