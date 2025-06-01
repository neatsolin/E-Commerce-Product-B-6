var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function generateId() {
    var timestamp = Date.now().toString(36);
    var randomStr = Math.random().toString(36).substring(2, 10);
    return "".concat(timestamp, "-").concat(randomStr);
}
var User = /** @class */ (function () {
    function User(username, email, password, address) {
        this.userId = generateId();
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.isLoggedIn = false;
    }
    User.prototype.register = function (email, password) {
        if (!email || !password) {
            console.log("Incorrect email or password: Try again.");
            return false;
        }
        this.email = email;
        this.password = password;
        console.log("register: Username: ".concat(this.username, ", Email: ").concat(this.email, ", Password: ").concat(this.password));
        return true;
    };
    User.prototype.login = function (email, password) {
        if (!email || !password) {
            console.log("Incorrect email or password: Try again.");
            return false;
        }
        if (this.email === email && this.password === password) {
            this.isLoggedIn = true;
            console.log("login: Username: ".concat(this.username, ", Email: ").concat(this.email, ", Password: ").concat(this.password));
            return true;
        }
        else {
            console.log("Incorrect: email or password: Try again");
            return false;
        }
    };
    User.prototype.logout = function () {
        this.isLoggedIn = false;
        console.log("Logout: Username: ".concat(this.username, ", Email: ").concat(this.email));
    };
    User.prototype.isAuthenticated = function () {
        return this.isLoggedIn;
    };
    return User;
}());
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer(username, email, password, address, phoneNumber) {
        var _this = _super.call(this, username, email, password, address) || this;
        _this.orders = [];
        _this.customerId = generateId();
        _this.phoneNumber = phoneNumber;
        return _this;
    }
    Customer.prototype.placeOrder = function (order) {
        this.orders.push(order);
    };
    return Customer;
}(User));
var Seller = /** @class */ (function (_super) {
    __extends(Seller, _super);
    function Seller(username, email, password, address, platformSellers) {
        var _this = _super.call(this, username, email, password, address) || this;
        _this.orders = [];
        _this.products = [];
        _this.sellerId = generateId();
        _this.platformSellers = platformSellers;
        return _this;
    }
    return Seller;
}(User));
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(username, email, password, address) {
        var _this = _super.call(this, username, email, password, address) || this;
        _this.products = [];
        _this.adminId = generateId();
        return _this;
    }
    Admin.prototype.updateStockForSeller = function (product, quantity) {
        product.quantity = quantity;
    };
    return Admin;
}(User));
var Product = /** @class */ (function () {
    function Product(sellerId, adminId, productName, quantity) {
        this.productId = generateId();
        this.sellerId = sellerId;
        this.adminId = adminId;
        this.productName = productName;
        this.quantity = quantity;
    }
    return Product;
}());
var Order = /** @class */ (function () {
    function Order(customerId, sellerId) {
        this.orderId = generateId();
        this.customerId = customerId;
        this.sellerId = sellerId;
        this.orderDate = new Date();
    }
    return Order;
}());
// === Test All Roles ===
console.log("=== User Test ===");
var user = new User("solin", "user@example.com", "userpass", "Street A");
user.register("user@example.com", "userpass");
user.login("user@example.com", "wrongpass");
// user.login("user@example.com", "userpass");  
user.logout();
console.log("\n=== Customer Test ===");
var customer = new Customer("CustomerOne", "cust@example.com", "custpass", "Street B", "098888888");
customer.register("cust@example.com", "custpass");
// customer.login("wrong@example.com", "custpass"); 
customer.login("cust@example.com", "custpass");
customer.logout();
console.log("\n=== Seller Test ===");
var seller = new Seller("SellerOne", "sell@example.com", "sellpass", "Street C", true);
seller.register("sell@example.com", "sellpass");
seller.login("", "");
seller.login("sell@example.com", "sellpass");
seller.logout();
console.log("\n=== Admin Test ===");
var admin = new Admin("AdminOne", "admin@example.com", "adminpass", "Street D");
admin.register("admin@example.com", "adminpass");
admin.login("admin@example.com", "wrong");
admin.login("admin@example.com", "adminpass");
admin.logout();
