

// Minimal implementations for dependent classes
import { DeliveryOption } from "./Product/DeliveryOption";
import { Product } from "./Product/Product";
import { ProductCategory } from "./Product/ProductCategory";
import { Review } from "./Product/Review";
import { Payment } from "./Payment/Payment";
import { User } from "./Customer/User";
import { Order } from "./Order/Order";
import { Cart } from "./Cart/Cart";
import { CartItem } from "./Cart/CartItem";
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
  PURPLE: "\x1b[95m",
};

// Generate unique numeric IDs
let idCounter = 0;
function generateId(): number {
  return ++idCounter;
}

// Minimal implementations for dependent classes











class Main {
  private deliveryOptions: DeliveryOption[] = [];
  private productCategories: ProductCategory[] = [];
  private products: Product[] = [];
  private reviews: Review[] = [];
  private orders: Order[] = [];
  private userPayments: Map<
    string,
    { orderId: number; payments: Payment[]; createdAt: Date }[]
  > = new Map();
  private carts: Map<string, Cart> = new Map();
  private currentUser: User | null = null;
  private canceledProductIds: Set<number> = new Set(); // Track canceled product IDs

  constructor() {
    // Initialize delivery options
    this.deliveryOptions = [
      new DeliveryOption(1, "Standard", 5),
      new DeliveryOption(2, "Express", 6),
      new DeliveryOption(3, "Same-Day", 6),
    ];

    // Initialize product categories
    this.productCategories = [
      new ProductCategory(1, "Clothing"),
      new ProductCategory(2, "Electronics"),
      new ProductCategory(3, "Accessories"),
    ];

    // Initialize products
    this.products = [
      new Product(1, "T-Shirt", "Clothing", 10.0, 50, 1),
      new Product(2, "Laptop Stand", "Electronics", 8.0, 30, 2),
      new Product(3, "USB Cable", "Accessories", 5.0, 100, 1),
    ];

    // Initialize reviews
    this.reviews = [
      new Review(generateId(), 1, "initial-user-id", 4, "Great t-shirt, fits well!"),
    ];

    // Initialize Solin's cart
    const solinCart = new Cart();
    const tShirt = this.products.find((p) => p.id === 1)!;
    const laptopStand = this.products.find((p) => p.id === 2)!;
    const standardDelivery = this.deliveryOptions.find((d) => d.id === 1)!;
    const expressDelivery = this.deliveryOptions.find((d) => d.id === 2)!;

    solinCart.addItem(tShirt, 2, standardDelivery);

    this.carts.set("Solin", solinCart);
  }
 
  // view total order
  viewOrderTotal(username: string): void {
    if (!this.currentUser || !this.currentUser.isAuthenticated()) {
      console.log(
        `${COLORS.RED}⚠️  Please log in to view your order total.${COLORS.RESET}`
      );
      return;
    }

    const userPaymentData = this.userPayments.get(username) || [];
    let totalOrderPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryFee = 0;

    userPaymentData.forEach((orderData) => {
      orderData.payments.forEach((payment) => {
        totalOrderPrice += payment.amount;
        const order = this.orders.find((o) => o.getId() === orderData.orderId);
        if (order) {
          totalDiscount += order
            .getItems()
            .reduce((sum, item) => {
              const product = this.products.find((p) => p.id === item.productId);
              return sum + (product?.discount || 0) * item.quantity;
            }, 0);
          const deliveryOption = this.deliveryOptions.find(
            (d) => d.id === order.getDeliveryOptionId()
          );
          totalDeliveryFee += deliveryOption?.price || 0;
        }
      });
    });

    const finalTotal = totalOrderPrice - totalDiscount + totalDeliveryFee;
    console.log(`${COLORS.CYAN}\nOrder Total for ${username}: {${COLORS.RESET}`);
    console.log(`  Total Price: ${COLORS.GREEN}$${totalOrderPrice.toFixed(2)}${COLORS.RESET}`);
    console.log(`  Total Discount: ${COLORS.GREEN}$${totalDiscount.toFixed(2)}${COLORS.RESET}`);
    console.log(`  Delivery Fee: ${COLORS.GREEN}$${totalDeliveryFee.toFixed(2)}${COLORS.RESET}`);
    console.log(`  Final Total: ${COLORS.GREEN}$${finalTotal.toFixed(2)}${COLORS.RESET}`);
    console.log(`}`);
  }


// view seller order
  viewSellerOrders(sellerId: number): void {
    const sellerOrders = this.orders.filter((order) =>
      order
        .getItems()
        .some((item) =>
          this.products.find((p) => p.id === item.productId && p.sellerId === sellerId)
        )
    );

    if (sellerOrders.length === 0) {
      console.log(
        `${COLORS.YELLOW}No orders found for seller with ID ${sellerId}.${COLORS.RESET}`
      );
      return;
    }

    console.log(`${COLORS.CYAN}\nOrders for Seller ${sellerId}: [${COLORS.RESET}`);
    sellerOrders.forEach((order, index) => {
      console.log(`${COLORS.GREEN}  Order {${COLORS.RESET}`);
      console.log(`    id: ${COLORS.YELLOW}${order.getId()}${COLORS.RESET},`);
      console.log(
        `    customerId: ${COLORS.YELLOW}${order.getCustomerId()}${COLORS.RESET},`
      );
      console.log(
        `    items: [${order.getItems().map((item) => `${item.productId}`).join(", ")}]`
      );
      console.log(`  }${index < sellerOrders.length - 1 ? "," : ""}`);
    });
    console.log("]");
  }


// view ShipmentDetails id
  viewShipmentDetails(orderId: number): void {
    const order = this.orders.find((o) => o.getId() === orderId);
    if (!order) {
      console.log(
        `${COLORS.RED}⚠️  Order with ID ${orderId} not found.${COLORS.RESET}`
      );
      return;
    }

    const deliveryOption = this.deliveryOptions.find(
      (d) => d.id === order.getDeliveryOptionId()
    );
    if (!this.currentUser) {
      console.log(
        `${COLORS.RED}⚠️  No current user logged in to determine destination.${COLORS.RESET}`
      );
      return;
    }
    this.currentUser.setAddress(this.currentUser.getId());

    console.log(`${COLORS.CYAN}\nShipment Details for Order ${orderId}: {${COLORS.RESET}`);
    console.log(
      `  Delivery Method: ${COLORS.GREEN}'${deliveryOption?.name || "Unknown"}'${COLORS.RESET},`
    );
    console.log(
      `  Price: ${COLORS.GREEN}$${(deliveryOption?.price || 0).toFixed(2)}${COLORS.RESET},`
    );
    console.log(
      `  Destination: ${COLORS.GREEN}'${this.currentUser.getAddress()}'${COLORS.RESET}`
    );
    console.log(`}`);
  }

// seller view in skock
  viewStockBySeller(): void {
    const stockBySeller = new Map<number, { productName: string; quantity: number }[]>();
    this.products.forEach((product) => {
      if (!this.canceledProductIds.has(product.id)) {
        if (!stockBySeller.has(product.sellerId)) {
          stockBySeller.set(product.sellerId, []);
        }
        stockBySeller.get(product.sellerId)!.push({
          productName: product.name,
          quantity: product.stockQuantity,
        });
      }
    });

    console.log(`${COLORS.CYAN}\nStock by Seller: {${COLORS.RESET}`);
    stockBySeller.forEach((products, sellerId) => {
      console.log(`  Seller ${sellerId}: [`);
      products.forEach((item, index) => {
        console.log(
          `    { productName: ${COLORS.GREEN}'${item.productName}'${COLORS.RESET}, quantity: ${COLORS.GREEN}${item.quantity}${COLORS.RESET} }${index < products.length - 1 ? "," : ""}`
        );
      });
      console.log("  ],");
    });
    console.log(`}${COLORS.RESET}`);
  }

  // Product cancel
  cancelOrderItem(orderId: number, productId: number): void {
    if (!this.currentUser || !this.currentUser.isAuthenticated()) {
      console.log(
        `${COLORS.RED}⚠️  Please log in to cancel an item.${COLORS.RESET}`
      );
      return;
    }

    const order = this.orders.find((o) => o.getId() === orderId);
    if (!order) {
      console.log(
        `${COLORS.RED}⚠️  Order with ID ${orderId} not found.${COLORS.RESET}`
      );
      return;
    }

    const itemIndex = order.getItems().findIndex((item) => item.productId === productId);
    if (itemIndex === -1) {
      console.log(
        `${COLORS.RED}⚠️  Product with ID ${productId} not found in order.${COLORS.RESET}`
      );
      return;
    }

    const item = order.getItems()[itemIndex];
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.stockQuantity += item.quantity;
      this.canceledProductIds.add(productId);
    }

    const refundAmount = 10.00;
    order.getItems().splice(itemIndex, 1);

    const userPaymentData = this.userPayments.get(this.currentUser.getUsername()) || [];
    const orderData = userPaymentData.find((data) => data.orderId === orderId);
    if (orderData) {
      orderData.payments.forEach((payment) => {
        payment.status = "refunded";
      });
    }

    console.log(`${COLORS.CYAN}Canceled Item Details: {${COLORS.RESET}`);
    console.log(`  Product ID: ${COLORS.GREEN}${productId}${COLORS.RESET},`);
    console.log(`  Name: ${COLORS.GREEN}'${product?.name || 'Unknown'}'${COLORS.RESET},`);
    console.log(`  Quantity: ${COLORS.GREEN}${item.quantity}${COLORS.RESET}`);
    console.log(`}`);

    console.log(
      `${COLORS.GREEN}✅ Item ${productId} canceled. Status: canceled. Refunded amount: $10.00${COLORS.RESET}`
    );

    console.log(`${COLORS.CYAN}Updated Order ${orderId} Items: [${COLORS.RESET}`);
    order.getItems().forEach((item, index) => {
      const prod = this.products.find((p) => p.id === item.productId);
      console.log(
        `${COLORS.GREEN}  { productId: ${item.productId}, name: '${prod?.name || "Unknown"}', quantity: ${item.quantity} }${index < order.getItems().length - 1 ? "," : ""}${COLORS.RESET}`
      );
    });
    console.log("]");

    console.log(`${COLORS.CYAN}Updated Payments for Order ${orderId}: [${COLORS.RESET}`);
    if (orderData) {
      orderData.payments.forEach((payment, index) => {
        console.log(
          `${COLORS.GREEN}  Payment {\n` +
            `    id: ${COLORS.YELLOW}${payment.id}${COLORS.RESET},\n` +
            `    status: ${COLORS.GREEN}'${payment.status}'${COLORS.RESET}\n` +
            `  }${index < orderData.payments.length - 1 ? "," : ""}${COLORS.RESET}`
        );
      });
    }
    console.log("]");

    console.log(`${COLORS.CYAN}Updated Stock for Product ${productId}: ${COLORS.GREEN}${product?.stockQuantity}${COLORS.RESET}`);
  }

// add product new
  addReview(productId: number, rating: number, comment?: string): void {
    if (!this.currentUser || !this.currentUser.isAuthenticated()) {
      console.log(
        `${COLORS.RED}⚠️  Please log in to add a review.${COLORS.RESET}`
      );
      return;
    }

    if (rating < 1 || rating > 5) {
      console.log(
        `${COLORS.RED}❌ Rating must be between 1 and 5.${COLORS.RESET}`
      );
      return;
    }

    const reviewId: number = generateId();
    const newReview = new Review(reviewId, productId, this.currentUser.getId(), rating, comment);
    this.reviews.push(newReview);

    console.log(
      `${COLORS.GREEN}✅ Review added for product ${productId} by ${this.currentUser.getUsername()}.${COLORS.RESET}`
    );

    console.log(`${COLORS.CYAN}Updated Reviews for Product ${productId}: [${COLORS.RESET}`);
    this.reviews.filter((r) => r.productId === productId).forEach((review, index) => {
      console.log(
        `${COLORS.GREEN}  Review {\n` +
          `    id: ${COLORS.YELLOW}${review.id}${COLORS.RESET},\n` +
          `    userId: ${COLORS.YELLOW}${review.userId}${COLORS.RESET},\n` +
          `    rating: ${COLORS.GREEN}${review.rating}${COLORS.RESET},\n` +
          `    comment: ${COLORS.GREEN}'${review.comment || "N/A"}'${COLORS.RESET}\n` +
          `  }${index < this.reviews.filter((r) => r.productId === productId).length - 1 ? "," : ""}${COLORS.RESET}`
      );
    });
    console.log("]");
  }
// add  new product when update
  addProduct(
    sellerId: number,
    name: string,
    category: string,
    price: number,
    stockQuantity: number,
    discount?: number
  ): void {
    const productId = this.products.length + 1;
    const newProduct = new Product(
      productId,
      name,
      category,
      price,
      stockQuantity,
      sellerId,
      discount
    );
    this.products.push(newProduct);

    console.log(
      `${COLORS.GREEN}✅ Product ${name} (ID: ${productId}) added successfully by Seller ${sellerId}.${COLORS.RESET}`
    );
    console.log(`${COLORS.CYAN}Updated Products: [${COLORS.RESET}`);

    // Filter out canceled products when displaying the updated list
    const activeProducts = this.products.filter((product) => !this.canceledProductIds.has(product.id));
    activeProducts.forEach((product, index) => {
      console.log(`${COLORS.GREEN}  Product {${COLORS.RESET}`);
      console.log(`    id: ${COLORS.YELLOW}${product.id}${COLORS.RESET},`);
      console.log(`    name: ${COLORS.GREEN}'${product.name}'${COLORS.RESET},`);
      console.log(
        `    category: ${COLORS.GREEN}'${product.category}'${COLORS.RESET},`
      );
      console.log(
        `    price: ${COLORS.GREEN}$${product.price.toFixed(2)}${COLORS.RESET},`
      );
      console.log(
        `    stockQuantity: ${COLORS.GREEN}${product.stockQuantity}${COLORS.RESET},`
      );
      console.log(
        `    discount: ${COLORS.GREEN}${(product.discount || 0).toFixed(2)}${COLORS.RESET},`
      );
      console.log(
        `    sellerId: ${COLORS.YELLOW}${product.sellerId}${COLORS.RESET}`
      );
      console.log(`  }${index < activeProducts.length - 1 ? "," : ""}`);
    });
    console.log("]");

    // Add the new product to Solin's cart
    const solinCart = this.carts.get("Solin");
    if (solinCart) {
      const defaultDeliveryOption = this.deliveryOptions.find((d) => d.id === 1)!; // Standard delivery
      solinCart.addItem(newProduct, 1, defaultDeliveryOption);
      console.log(
        `${COLORS.GREEN}✅ Added 1 ${name}(s) to Solin's cart with Standard delivery.${COLORS.RESET}`
      );

      // Verify and display the updated cart
      const updatedItems = solinCart.getItems();
      const newCartItem = updatedItems.find((item) => item.product.id === newProduct.id);
      if (newCartItem) {
        this.viewCart("Solin");
      } else {
        console.log(
          `${COLORS.RED}❌ Failed to add ${name} to Solin's cart.${COLORS.RESET}`
        );
      }
    } else {
      console.log(
        `${COLORS.RED}❌ Solin's cart not found.${COLORS.RESET}`
      );
    }
  }
// user loged and correct password
  setLoggedInUser(user: User): void {
    if (user.isAuthenticated()) {
      this.currentUser = user;
      console.log(
        `${COLORS.GREEN}✅ Welcome, ${user.getUsername()}!${COLORS.RESET}`
      );
      if (!this.userPayments.has(user.getUsername())) {
        this.userPayments.set(user.getUsername(), []);
      }
      if (!this.carts.has(user.getUsername())) {
        this.carts.set(user.getUsername(), new Cart());
      }
    } else {
      console.log(
        `${COLORS.RED}❌ Login failed. Cannot set user.${COLORS.RESET}`
      );
    }
  }
// add payment
  addPayment(
    orderId: number,
    amount: number,
    method: string,
    totalPrice: number | undefined,
    createdAt: Date,
    deliveryOptionId: number = 1
  ): void {
    if (!this.currentUser) {
      console.log(
        `${COLORS.RED}⚠️  Please log in to add a payment.${COLORS.RESET}`
      );
      return;
    }

    const cart = this.carts.get(this.currentUser.getUsername());
    if (!cart) {
      console.log(
        `${COLORS.RED}❌ Cart not found for ${this.currentUser.getUsername()}.${COLORS.RESET}`
      );
      return;
    }

    const items = cart.getItems();
    if (items.length === 0) {
      console.log(
        `${COLORS.RED}❌ Cart is empty. Add items before placing an order.${COLORS.RESET}`
      );
      return;
    }

    let userPaymentData = this.userPayments.get(this.currentUser.getUsername()) || [];
    let orderData = userPaymentData.find((data) => data.orderId === orderId);

    if (!orderData) {
      orderData = { orderId, payments: [], createdAt };
      userPaymentData.push(orderData);
      this.userPayments.set(this.currentUser.getUsername(), userPaymentData);
    }

    const payment = new Payment(generateId(), orderId, amount, method, totalPrice);

    // payment.createdAt = createdAt;
    orderData.payments.push(payment);

    if (!this.orders.find((o) => o.getId() === orderId)) {
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
      const newOrder = new Order(orderId, this.currentUser.getId(), orderItems, deliveryOptionId);
      this.orders.push(newOrder);
    }
  }

// view product
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
      console.log(
        `    price: ${COLORS.GREEN}$${option.price.toFixed(2)}${COLORS.RESET}`
      );
      console.log(`  }${index < this.deliveryOptions.length - 1 ? "," : ""}`);
    });
    console.log("]");

    console.log(`${COLORS.CYAN}\nProducts: [${COLORS.RESET}`);

    // Filter out canceled products
    const activeProducts = this.products.filter((product) => !this.canceledProductIds.has(product.id));
    activeProducts.forEach((product, index) => {
      console.log(`${COLORS.GREEN}  Product {${COLORS.RESET}`);
      console.log(`    id: ${COLORS.YELLOW}${product.id}${COLORS.RESET},`);
      console.log(`    name: ${COLORS.GREEN}'${product.name}'${COLORS.RESET},`);
      console.log(
        `    category: ${COLORS.GREEN}'${product.category}'${COLORS.RESET},`
      );
      console.log(
        `    price: ${COLORS.GREEN}$${product.price.toFixed(2)}${COLORS.RESET},`
      );
      console.log(
        `    stockQuantity: ${COLORS.GREEN}${product.stockQuantity}${COLORS.RESET},`
      );
      console.log(
        `    discount: ${COLORS.GREEN}${(product.discount || 0).toFixed(2)}${COLORS.RESET},`
      );
      console.log(
        `    sellerId: ${COLORS.YELLOW}${product.sellerId}${COLORS.RESET}`
      );
      console.log(`  }${index < activeProducts.length - 1 ? "," : ""}`);
    });
    console.log("]");

    console.log(`${COLORS.CYAN}\nCategories: [${COLORS.RESET}`);
    this.productCategories.forEach((category, index) => {
      console.log(
        `  ProductCategory { id: ${COLORS.YELLOW}${category.id}${COLORS.RESET}, name: ${COLORS.GREEN}'${category.name}'${COLORS.RESET} }${
          index < this.productCategories.length - 1 ? "," : ""
        }`
      );
    });
    console.log("]");

    console.log(`${COLORS.CYAN}\nReviews: [${COLORS.RESET}`);
    this.reviews.forEach((review, index) => {
      console.log(`${COLORS.GREEN}  Review {${COLORS.RESET}`);
      console.log(`    id: ${COLORS.YELLOW}${review.id}${COLORS.RESET},`);
      console.log(
        `    productId: ${COLORS.YELLOW}${review.productId}${COLORS.RESET},`
      );
      console.log(`    userId: ${COLORS.YELLOW}${review.userId}${COLORS.RESET},`);
      console.log(
        `    rating: ${COLORS.GREEN}${review.rating}${COLORS.RESET},`
      );
      console.log(
        `    comment: ${COLORS.GREEN}'${review.comment ?? "N/A"}'${COLORS.RESET}`
      );
      console.log(`  }${index < this.reviews.length - 1 ? "," : ""}`);
    });
    console.log("]");

    const userPaymentData = this.userPayments.get(this.currentUser.getUsername()) || [];
    userPaymentData.forEach((order) => {
      console.log(`${COLORS.CYAN}\nOrder ${order.orderId}: {${COLORS.RESET}`);
      console.log(
        `  Date: ${COLORS.PURPLE}'${order.createdAt.toLocaleString()}'${COLORS.RESET},`
      );
      console.log(`  Payments: [`);
      order.payments.forEach((payment) => {
        console.log(
          `${COLORS.GREEN}    Payment {\n` +
            `      id: ${COLORS.YELLOW}${payment.id}${COLORS.RESET},\n` +
            `      orderId: ${COLORS.YELLOW}${payment.orderId}${COLORS.RESET},\n` +
            `      amount: ${COLORS.GREEN}$${payment.amount.toFixed(2)}${COLORS.RESET},\n` +
            `      method: ${COLORS.GREEN}'${payment.method}'${COLORS.RESET},\n` +
            `      status: ${COLORS.GREEN}'${payment.status}'${COLORS.RESET},\n` +
            `      totalPrice: ${COLORS.GREEN}$${payment.totalPrice?.toFixed(2) ?? "N/A"}${COLORS.RESET}\n` +
            `    },`
        );
      });
      console.log(`  ]`);
      console.log(`}`);
    });
  }

// view card
  viewCart(username: string): void {
    if (!this.currentUser || !this.currentUser.isAuthenticated()) {
      console.log(
        `${COLORS.RED}⚠️  Please log in to view your cart.${COLORS.RESET}`
      );
      return;
    }

    const cart = this.carts.get(username);
    if (!cart || cart.getItems().length === 0) {
      console.log(
        `${COLORS.YELLOW}Your cart is empty.${COLORS.RESET}`
      );
      return;
    }

    console.log(`${COLORS.CYAN}\nCart for ${username}: [${COLORS.RESET}`);
    cart.getItems().forEach((item, index) => {
      if (!this.canceledProductIds.has(item.product.id)) { 
        console.log(`${COLORS.GREEN}  CartItem {${COLORS.RESET}`);
        console.log(`    product: ${COLORS.GREEN}'${item.product.name}'${COLORS.RESET},`);
        console.log(`    quantity: ${COLORS.GREEN}${item.quantity}${COLORS.RESET},`);
        console.log(`    deliveryOption: ${COLORS.GREEN}'${item.deliveryOption.name}'${COLORS.RESET},`);
        console.log(`    itemTotal: ${COLORS.GREEN}$${item.getItemTotal().toFixed(2)}${COLORS.RESET},`);
        console.log(`    deliveryCost: ${COLORS.GREEN}$${item.getDeliveryCost().toFixed(2)}${COLORS.RESET},`);
        console.log(`    total: ${COLORS.GREEN}$${item.getTotal().toFixed(2)}${COLORS.RESET}`);
        console.log(`  }${index < cart.getItems().length - 1 ? "," : ""}`);
      }
    });
    // console.log("]");
    // console.log(
    //   `${COLORS.CYAN}Total Cart Cost: ${COLORS.GREEN}$${cart.getTotalCartCost().toFixed(2)}${COLORS.RESET}`
    // );
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
const user1 = new User("Solin", "solin@solin.com", "userpass", "Street A");
user1.register("solin@solin.com", "userpass");
user1.login("solin@solin.com", "userpass");
app.setLoggedInUser(user1);

const solinOrderDate = new Date("2025-06-05T19:58:00+07:00");
app.addPayment(1, 60.00, "Credit Card", 60.00, solinOrderDate);
app.viewProducts();
app.viewOrderTotal("Solin");
app.cancelOrderItem(1, 1); 
app.addReview(1, 5, "Excellent product!");
app.viewCart("Solin");
user1.logout();

console.log(`${COLORS.CYAN}\n=== Seller Test: Seller 1 ===${COLORS.RESET}`);

// Log Solin back in to view the cart after adding a product
user1.login("solin@solin.com", "userpass");
app.setLoggedInUser(user1);
app.viewSellerOrders(1);
app.addProduct(1, "Smartwatch", "Electronics", 149.99, 15, 10);

console.log(`${COLORS.CYAN}\n=== Delivery Manager Test ===${COLORS.RESET}`);
app.viewShipmentDetails(1);

console.log(`${COLORS.CYAN}\n=== Admin Test ===${COLORS.RESET}`);
app.viewStockBySeller();