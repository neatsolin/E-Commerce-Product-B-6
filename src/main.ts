import { Address } from './Customer/Address';
import { Customer } from './Customer/Customer';
import { Seller } from './Customer/Seller';
import { User } from './Customer/User';
import { Product } from './Product/Product';
import { Category } from './Product/ProductCategory';
import { Order } from './Order/Order';
import { OrderItem } from './Order/OrderItem';
import { DeliveryOption } from './Product/DeliveryOption';
import { Shipment } from './Order/Shipment';
import { Review } from './Product/Review';
import { Refund } from './Order/Refund';
import { Cart } from './Cart/Cart';
import { CartItem } from './Cart/CartItem';
import { Invoice } from './Order/Invoice';
import { Payment } from './Payment/Payment';
import { Register } from './Auth/Register';
import { Login } from './Auth/Login';
import { Logout } from './Auth/Logout';
import { Admin } from './Customer/Admin';

// Interface for customer result object
interface CustomerResult {
  phoneNumber: string;
  address: string;
  orders: { orderNumber: string; totalPrice: number; shipmentCount: number; items: { productName: string; quantity: number }[] }[];
  cart: { productName: string; quantity: number; deliveryOption?: string }[];
  reviews: { productName: string; rating: number; comment: string }[];
  refunds: { productName: string; amount: number }[];
  paymentStatuses: { orderNumber: string; status: string }[];
}

// Test setup: Register users and create products
const register = new Register();
const login = new Login();
const logout = new Logout();
const address1 = new Address('St 123, Phnom Penh', 'Phnom Penh', 'Cambodia', '12000', 'home');
const address2 = new Address('St 456, Siem Reap', 'Siem Reap', 'Cambodia', '17000', 'office');
const customerUser1 = register.register('0812345678', address1, 'customer');
const customerUser2 = register.register('0898765432', address2, 'customer');
const customer1 = customerUser1.customer!;
const customer2 = customerUser2.customer!;
const sellerUser1 = register.register('seller1@example.com', address1, 'seller');
const seller1 = sellerUser1.seller!;
const sellerUser2 = register.register('seller2@example.com', address2, 'seller');
const seller2 = sellerUser2.seller!;
const adminUser = register.register('admin@example.com', address1, 'admin');
const admin = adminUser.admin!;

// Add users to login system
login.addUser(customerUser1);
login.addUser(customerUser2);
login.addUser(sellerUser1);
login.addUser(sellerUser2);
login.addUser(adminUser);

// Authenticate users
const authenticatedCustomer1 = login.authenticate('0812345678', 'pass');
const authenticatedCustomer2 = login.authenticate('0898765432', 'pass');
const authenticatedSeller1 = login.authenticate('seller1@example.com', 'pass');
const authenticatedAdmin = login.authenticate('admin@example.com', 'pass');
if (!authenticatedCustomer1 || !authenticatedCustomer2 || !authenticatedSeller1 || !authenticatedAdmin) throw new Error('Authentication failed');

const category1 = new Category('Electronics');
const category2 = new Category('Clothing');
const product1 = new Product('Laptop Stand', category1, 1500, 50, seller1, 100);
const product2 = new Product('T-Shirt', category2, 300, 100, seller2, 50);
const product3 = new Product('USB Cable', category1, 200, 200, seller1);

const deliveryOption1 = new DeliveryOption('express', 200);
const deliveryOption2 = new DeliveryOption('standard', 50);

// Collect results for each customer
const results: { [phoneNumber: string]: CustomerResult } = {};

function updateCustomerResult(customer: Customer, result: Partial<CustomerResult>): void {
  const phoneNumber = customer.phoneNumber;
  if (!results[phoneNumber]) {
    results[phoneNumber] = {
      phoneNumber,
      address: customer.address.toString(),
      orders: [],
      cart: [],
      reviews: [],
      refunds: [],
      paymentStatuses: [],
    };
  }

  results[phoneNumber].orders = [...results[phoneNumber].orders, ...(result.orders || [])];
  results[phoneNumber].cart = result.cart || results[phoneNumber].cart;
  results[phoneNumber].reviews = [...results[phoneNumber].reviews, ...(result.reviews || [])];
  results[phoneNumber].refunds = [...results[phoneNumber].refunds, ...(result.refunds || [])];
  results[phoneNumber].paymentStatuses = [...results[phoneNumber].paymentStatuses, ...(result.paymentStatuses || [])];

  console.log(`Updated results for ${phoneNumber}:`, JSON.stringify(results[phoneNumber], null, 2));
}

// Test: Customer 1 places an order
const order1 = new Order(customer1, deliveryOption1);
order1.orderItems.push(new OrderItem(product1, 2), new OrderItem(product2, 1));
order1.createShipments();
const shipment1 = order1.shipments[0];
const deliveryDetails = shipment1.getDeliveryDetails();
console.log(`Delivery Details for ${order1.orderNumber} to ${deliveryDetails.destination}:`, deliveryDetails);
const totalPrice1 = customer1.getOrderTotal(order1); // 3150: (1500*2-100) + (300-50) + 200
const payment1 = new Payment(order1, totalPrice1, 'credit card');
payment1.processPayment();
order1.invoice = new Invoice(order1, totalPrice1);
customer1.orders.push(order1);
updateCustomerResult(customer1, { 
  orders: [{
    orderNumber: order1.orderNumber,
    totalPrice: totalPrice1,
    shipmentCount: order1.shipments.length,
    items: order1.orderItems.map(item => ({ productName: item.product.productName, quantity: item.quantity })),
  }],
  paymentStatuses: [{ orderNumber: order1.orderNumber, status: payment1.status }],
});

// Test: Seller 1 filters orders
const sellerOrders = seller1.getOrdersBySeller(customer1.orders);
console.log(`Seller 1 Orders in Cambodia:`, sellerOrders.map(o => o.orderNumber));

// Test: Customer 2 places an order
const order2 = new Order(customer2);
order2.orderItems.push(new OrderItem(product3, 3));
try {
  order2.createShipments();
} catch (e) {
  console.log('Customer 2 Order 2: No delivery option, skipping shipments in Cambodia');
  order2.shipments = [];
}
const totalPrice2 = customer2.getOrderTotal(order2); // 600: 200 * 3
const payment2 = new Payment(order2, totalPrice2, 'credit card');
payment2.processPayment();
order2.invoice = new Invoice(order2, totalPrice2);
customer2.orders.push(order2);
updateCustomerResult(customer2, { 
  orders: [{
    orderNumber: order2.orderNumber,
    totalPrice: totalPrice2,
    shipmentCount: order2.shipments.length,
    items: order2.orderItems.map(item => ({ productName: item.product.productName, quantity: item.quantity })),
  }],
  paymentStatuses: [{ orderNumber: order2.orderNumber, status: payment2.status }],
});

// Test: Admin checks total stock
admin.addSeller(seller1);
admin.addSeller(seller2);
const totalStock = admin.getTotalStock();
console.log('Admin Total Stock in Cambodia:', totalStock);

// Test: Customer 1 cancels an item
const order4 = new Order(customer1, deliveryOption2);
order4.orderItems.push(new OrderItem(product1, 1), new OrderItem(product2, 2));
const refund1 = customer1.cancelOrderItem(order4, 'Laptop Stand');
if (refund1) {
  customer1.orders.push(order4);
  updateCustomerResult(customer1, { 
    orders: [{
      orderNumber: order4.orderNumber,
      totalPrice: customer1.getOrderTotal(order4), // 550: (300*2-50)
      shipmentCount: order4.shipments.length,
      items: order4.orderItems.map(item => ({ productName: item.product.productName, quantity: item.quantity })),
    }],
    refunds: [{ productName: 'Laptop Stand', amount: refund1.amount }],
  });
}

// Test: Customer 1 adds a review
const order5 = new Order(customer1, deliveryOption1);
order5.orderItems.push(new OrderItem(product3, 1));
customer1.orders.push(order5);
const review1 = customer1.addReview(product3, 4, 'Great cable for Cambodia!');
updateCustomerResult(customer1, { 
  reviews: [{ productName: product3.productName, rating: review1.rating, comment: review1.comment }],
});

// Test: Customer 2 uses cart
customer2.cart.addItem(new CartItem(product2, 3, deliveryOption2));
customer2.cart.addItem(new CartItem(product3, 1, deliveryOption2));
const order6 = customer2.cart.checkout();
order6.createShipments();
const totalPrice6 = customer2.getOrderTotal(order6); // 950: (300*3-150) + 200 + 50
const payment6 = new Payment(order6, totalPrice6, 'credit card');
payment6.processPayment();
order6.invoice = new Invoice(order6, totalPrice6);
updateCustomerResult(customer2, { 
  orders: [{
    orderNumber: order6.orderNumber,
    totalPrice: totalPrice6,
    shipmentCount: order6.shipments.length,
    items: order6.orderItems.map(item => ({ productName: item.product.productName, quantity: item.quantity })),
  }],
  cart: customer2.cart.items.map(item => ({
    productName: item.product.productName,
    quantity: item.quantity,
    deliveryOption: item.deliveryOption?.method,
  })),
  paymentStatuses: [{ orderNumber: order6.orderNumber, status: payment6.status }],
});

// Test: Logout
logout.logout(customerUser1);
logout.logout(customerUser2);

// Log final results for each customer

// console.log('E-commerce system test results on May 30, 2025 at 04:35 PM +07:');
// Object.values(results).forEach(result => {
//   console.log(JSON.stringify(result, null, 2));
// });


