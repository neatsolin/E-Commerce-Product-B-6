
export interface Authenticable {
    login(email: string, password: string): boolean;
    logout(): void;
    register(email: string, password: string): boolean;
    isAuthenticated(): boolean;
}

export class User implements Authenticable {
    userId: string;
    username: string;
    email: string;
    password: string;
    address: string;
    private isLoggedIn: boolean;

    constructor(username: string, email: string, password: string, address: string) {
        this.userId = Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.isLoggedIn = false;
    }

    register(email: string, password: string): boolean {
        if (!email || !password) {
            console.log("Email or password is missing. Try again.");
            return false;
        }
        this.email = email;
        this.password = password;
        console.log("Registration successful.");
        return true;
    }

    login(email: string, password: string): boolean {
        if (this.email === email && this.password === password) {
            this.isLoggedIn = true;
            console.log("Login successful.");
            return true;
        } else {
            console.log("Incorrect email or password. Try again.");
            return false;
        }
    }

    logout(): void {
        this.isLoggedIn = false;
        console.log("Logout successful.");
    }

    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }
}

export class Customer extends User {
    phoneNumber: string;

    constructor(username: string, email: string, password: string, address: string, phoneNumber: string) {
        super(username, email, password, address);
        this.phoneNumber = phoneNumber;
    }
}

export class Seller extends User {
    platformSellers: boolean;

    constructor(username: string, email: string, password: string, address: string, platformSellers: boolean) {
        super(username, email, password, address);
        this.platformSellers = platformSellers;
    }
}

export class Admin extends User {
    constructor(username: string, email: string, password: string, address: string) {
        super(username, email, password, address);
    }
}
