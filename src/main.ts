import { Admin, Customer, Seller, User } from "./Auth/User";
import { registerUser } from "./Auth/Register";
import { loginUser } from "./Auth/Login";
import { logoutUser } from "./Auth/Logout";

// Test All Roles 
console.log("=== User Test ===");
const user = new User("UserOne", "user@example.com", "userpass", "Street A");
user.register("user@example.com", "userpass");
user.login("user@example.com", "wrongpass");
user.login("user@example.com", "userpass"); 
 
user.logout();

//  Customer 
console.log("\n=== Customer Test ===");
const customer = new Customer("CustomerOne", "cust@example.com", "custpass", "Street B", "098888888");
customer.register("cust@example.com", "custpass");
customer.login("wrong@example.com", "custpass"); 


customer.login("cust@example.com", "custpass");  
customer.logout();

// Seller
console.log("\n=== Seller Test ===");
const seller = new Seller("SellerOne", "sell@example.com", "sellpass", "Street C", true);
seller.register("sell@example.com", "sellpass");
seller.login("", "");                          
seller.login("sell@example.com", "sellpass");   
seller.logout();

// Admin Authentication
console.log("\n=== Admin Authentication Tests ===");
const admin = new Admin("AdminUser", "admin@example.com", "pass123", "101 Blvd");
console.log("Admin Register:", admin.register("admin.new@example.com", "newpass123") ? "successful" : "failed");
console.log("Admin Login:", admin.login("admin.new@example.com", "newpass123") ? "successful" : "try again");
console.log("Admin Authenticated:", admin.isAuthenticated() ? "successful" : "not authenticated");
admin.logout();
console.log("Admin Logout: successful");
console.log("Admin Authenticated after logout:", admin.isAuthenticated() ? "successful" : "not authenticated");

