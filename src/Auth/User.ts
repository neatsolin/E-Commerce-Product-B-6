function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${randomStr}`;
}

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
        this.userId = generateId();
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.isLoggedIn = false;
    }

    register(email: string, password: string): boolean {
        if (!email || !password) {
            console.log(`Incorrect email or password: Try again.`);
            return false;
        }
        this.email = email;
        this.password = password;
        console.log(`register: Username: ${this.username}, Email: ${this.email}, Password: ${this.password}`);
        return true;
    }

    login(email: string, password: string): boolean {
        if (!email || !password) {
            console.log(`Incorrect email or password: Try again.`);
            return false;
        }

        if (this.email === email && this.password === password) {
            this.isLoggedIn = true;
            console.log(`login: Username: ${this.username}, Email: ${this.email}, Password: ${this.password}`);
            return true;
        } else {
            console.log(`Incorrect: email or password: Try again`);
            return false;
        }
    }

    logout(): void {
        this.isLoggedIn = false;
        console.log(`Logout: Username: ${this.username}, Email: ${this.email}`);
    }

    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }
}
