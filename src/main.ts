import { DeliveryOption } from "./Product/DeliveryOption";
import { Product } from "./Product/Product";
import { ProductCategory } from "./Product/ProductCategory";
import { Review } from "./Product/Review";
import { Payment } from "./Payment/Payment";
import { User } from "./Auth/User";

// ANSI Color Codes
const COLORS = {
  RESET: "\x1b[0m",
  GREEN: "\x1b[32m",
  CYAN: "\x1b[36m",
  YELLOW: "\x1b[33m",
  MAGENTA: "\x1b[35m",
  RED: "\x1b[31m",
  BLUE: "\x1b[34m",
  GRAY: "\x1b[90m",
  ORANGE: "\x1b[91m",
  PURPLE: "\x1b[95m", // Bright magenta for purple
};

// Generate unique IDs
function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomStr}`;
}

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
    new Product(1, "T-Shirt", "Clothing", 10.0, 50, 1),
    new Product(2, "Laptop Stand", "Electronics", 500.0, 30, 2),
    new Product(3, "USB Cable", "Accessories", 50.0, 100, 1),
  ];

  private reviews: Review[] = [
    new Review(1, 1, 1, 4, "Great t-shirt, fits well!"),
  ];

  private payments: Payment[] = [];
  private userPayments: Map<
    string,
    { orderId: number; payments: Payment[]; createdAt: Date }[]
  > = new Map();
  private currentUser: User | null = null;

  setLoggedInUser(user: User): void {
    if (user.isAuthenticated()) {
      this.currentUser = user;
      console.log(
        `${COLORS.GREEN}✅ Welcome, ${user.getUsername()}!${COLORS.RESET}`
      );
      if (!this.userPayments.has(user.getUsername())) {
        this.userPayments.set(user.getUsername(), []);
      }
    } else {
      console.log(
        `${COLORS.RED}❌ Login failed. Cannot set user.${COLORS.RESET}`
      );
    }
  }

  addPayment(
    orderId: number,
    amount: number,
    method: string,
    totalPrice: number | undefined,
    createdAt: Date
  ): void {
    if (this.currentUser) {
      let userPaymentData =
        this.userPayments.get(this.currentUser.getUsername()) || [];
      let orderData = userPaymentData.find((data) => data.orderId === orderId);

      if (!orderData) {
        orderData = { orderId, payments: [], createdAt: createdAt };
        userPaymentData.push(orderData);
        this.userPayments.set(this.currentUser.getUsername(), userPaymentData);
      }

      if (orderData.payments.length === 0) {
        const payment = new Payment(
          parseInt(generateId().split("-")[0], 36),
          orderId,
          amount,
          method,
          totalPrice
        );
        payment.createdAt = orderData.createdAt;
      }
    }
  }

  viewProducts(): void {
    if (!this.currentUser || !this.currentUser.isAuthenticated()) {
      console.log(
        `${COLORS.RED}⚠️  Please log in to view products.${COLORS.RESET}`
      );
      return;
    }

    console.log(`${COLORS.CYAN}\nDeliveryOptions: [${COLORS.RESET}`);
    this.deliveryOptions.forEach((option, index) => {
      console.log(`${COLORS.GREEN}  DeliveryOption {${COLORS.RESET}`);
      console.log(`    id: ${COLORS.YELLOW}${option.id}${COLORS.RESET},`);
      console.log(`    name: ${COLORS.GREEN}'${option.name}'${COLORS.RESET},`);
      console.log(`    price: ${COLORS.GREEN}${option.price}${COLORS.RESET},`);
      console.log(`  }${index < this.deliveryOptions.length - 1 ? "," : ""}`);
    });
    console.log("]");

    console.log(`${COLORS.CYAN}\nProducts: [${COLORS.RESET}`);
    this.products.forEach((product, index) => {
      console.log(`${COLORS.GREEN}  Product {${COLORS.RESET}`);
      console.log(`    id: ${COLORS.YELLOW}${product.id}${COLORS.RESET},`);
      console.log(`    name: ${COLORS.GREEN}'${product.name}'${COLORS.RESET},`);
      console.log(
        `    category: ${COLORS.GREEN}'${product.category}'${COLORS.RESET},`
      );
      console.log(`    price: ${COLORS.GREEN}${product.price}${COLORS.RESET},`);
      console.log(
        `    stockQuantity: ${COLORS.GREEN}${product.stockQuantity}${COLORS.RESET},`
      );
      console.log(
        `    discount: ${COLORS.GREEN}${product.discount ?? "undefined"}${
          COLORS.RESET
        },`
      );
      console.log(
        `    sellerId: ${COLORS.GREEN}${product.sellerId}${COLORS.RESET},`
      );
      console.log(`  }${index < this.products.length - 1 ? "," : ""}`);
    });
    console.log("]");

    console.log(`${COLORS.CYAN}\nCategories: [${COLORS.RESET}`);
    this.productCategories.forEach((category, index) => {
      console.log(
        `  ProductCategory { id: ${COLORS.GREEN}${category.id}${
          COLORS.RESET
        }, name: ${COLORS.GREEN}'${category.name}'${COLORS.RESET} }${
          index < this.productCategories.length - 1 ? "," : ""
        }`
      );
    });
    console.log("]");

    console.log(`${COLORS.CYAN}\nReviews: [${COLORS.RESET}`);
    this.reviews.forEach((review, index) => {
      console.log(`${COLORS.GREEN}  Review {${COLORS.RESET}`);
      console.log(`    id: ${COLORS.GREEN}${review.id}${COLORS.RESET},`);
      console.log(
        `    productId: ${COLORS.GREEN}${review.productId}${COLORS.RESET},`
      );
      console.log(
        `    userId: ${COLORS.GREEN}${review.userId}${COLORS.RESET},`
      );
      console.log(
        `    rating: ${COLORS.GREEN}${review.rating}${COLORS.RESET},`
      );
      console.log(
        `    comment: ${COLORS.GREEN}'${review.comment}'${COLORS.RESET},`
      );
      console.log(`  }${index < this.reviews.length - 1 ? "," : ""}`);
    });
    console.log("]");

    const userPaymentData =
      this.userPayments.get(this.currentUser.getUsername()) || [];
    userPaymentData.forEach((order) => {
      console.log(`${COLORS.CYAN}\nOrder ${order.orderId}: {${COLORS.RESET}`);
      console.log(
        `  Date: ${COLORS.GREEN}'${order.createdAt.toLocaleString()}'${
          COLORS.RESET
        },`
      );
      console.log(`  Payments: [`);
      if (order.payments.length === 0) {
        console.log("    No payments yet.");
      } else {
        const totalAmountSpent = order.payments.reduce(
          (sum, payment) => sum + payment.totalPrice,
          0
        );
        const totalProducts = this.products.length;
        const totalCategories = this.productCategories.length;
        const totalProductsCost = this.products.reduce(
          (sum, product) => sum + product.price,
          0
        );

        order.payments.forEach((payment) => {
          console.log(
            `${COLORS.GREEN}    Payment {\n` +
              `      id: ${COLORS.GREEN}${payment.id}${COLORS.RESET},\n` +
              `      orderId: ${COLORS.GREEN}${payment.orderId}${COLORS.RESET},\n` +
              `      amount: ${COLORS.GREEN}${payment.amount}${COLORS.RESET},\n` +
              `      method: ${COLORS.GREEN}'${payment.method}'${COLORS.RESET},\n` +
              `      status: ${COLORS.GREEN}'${payment.status}'${COLORS.RESET},\n` +
              `      createdAt: ${
                COLORS.GREEN
              }${payment.createdAt.toISOString()}${COLORS.RESET},\n` +
              `      totalPrice: ${COLORS.GREEN}${payment.totalPrice}${COLORS.RESET},\n` +
              `      totalProductsBought: ${COLORS.GREEN}${totalProducts}${COLORS.RESET},\n` +
              `      totalCategoriesBought: ${COLORS.GREEN}${totalCategories}${COLORS.RESET},\n` +
              `      totalAmountSpent: ${COLORS.GREEN}${totalAmountSpent}${COLORS.RESET},\n` +
              `      totalProductsCost: ${
                COLORS.GREEN
              }${totalProductsCost.toFixed(2)}${COLORS.RESET}\n` +
              `    },`
          );
        });
      }
      console.log(`  ]`);
      console.log(`}`);
    });
  }

  getDeliveryOptions(): DeliveryOption[] {
    return this.deliveryOptions;
  }

  getProductCategories(): ProductCategory[] {
    return this.productCategories;
  }

  getReviews(): Review[] {
    return this.reviews;
  }
}

// Test Users & Main Flow
const app = new Main();

console.log(`${COLORS.CYAN}\n=== User Test: solin ===${COLORS.RESET}`);
const user1 = new User("solin", "solin@solin.com", "userpass", "Street A");
user1.register("solin@solin.com", "userpass");
user1.login("solin@solin.com", "userpass");
app.setLoggedInUser(user1);
const solinOrderDate = new Date("2025-06-03T19:57:00+07:00");
app.addPayment(1, 59.98, "Credit Card", 59.98, solinOrderDate);
app.viewProducts();
user1.logout();

console.log(`${COLORS.CYAN}\n=== User Test: ya ===${COLORS.RESET}`);
const user2 = new User("ya", "ya@ya.com", "yapass", "Street Y");
user2.register("ya@ya.com", "yapass");
user2.login("ya@ya.com", "yapass");
app.setLoggedInUser(user2);
const yaOrderDate = new Date("2025-06-03T20:02:00+07:00");
app.addPayment(2, 59.98, "Credit Card", 59.98, yaOrderDate);
app.viewProducts();
user2.logout();

console.log(`${COLORS.CYAN}\n=== User Test: Khoeum ===${COLORS.RESET}`);
const user3 = new User("Khoeum", "Khoeum@Khoeum.com", "khoupass", "Street K");
user3.register("Khoeum@Khoeum.com", "khoupass");
user3.login("Khoeum@Khoeum.com", "wrong");
app.setLoggedInUser(user3);
app.viewProducts();
user3.login("Khoeum@Khoeum.com", "khoupass");
app.setLoggedInUser(user3);
const khoeumOrderDate = new Date("2025-06-03T20:07:00+07:00");
app.addPayment(3, 59.98, "Paypal", 59.98, khoeumOrderDate);
app.viewProducts();
user3.logout();

console.log(`${COLORS.CYAN}\n=== User Test: kartrork ===${COLORS.RESET}`);
const user4 = new User(
  "kartrork",
  "kartrork@kartrork.com",
  "kartpass",
  "Street Z"
);
user4.register("kartrork@kartrork.com", "kartpass");
user4.login("wrong@kartrork.com", "kartpass");
user4.login("kartrork@kartrork.com", "kartpass");
app.setLoggedInUser(user4);
const kartrorkOrderDate = new Date("2025-06-03T20:12:00+07:00");
app.addPayment(4, 59.98, "Bank Transfer", 59.98, kartrorkOrderDate);
app.viewProducts();
user4.logout();