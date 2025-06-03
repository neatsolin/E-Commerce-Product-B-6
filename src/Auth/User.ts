// ID generator
function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomStr}`;
}

// Interface
export interface Authenticable {
  login(email: string, password: string): boolean;
  logout(): void;
  register(email: string, password: string): boolean;
  isAuthenticated(): boolean;
}

// Final User class
export class User implements Authenticable {
  userId: string;
  private isLoggedIn: boolean;

  constructor(
    private username: string,
    private email: string,
    private password: string,
    private address: string
  ) {
    this.userId = generateId();
    this.isLoggedIn = false;
  }

  register(email: string, password: string): boolean {
    if (!email || !password) {
      console.log(`❌ Incorrect email or password: Try again.`);
      return false;
    }
    this.email = email;
    this.password = password;
    console.log(`✅ Registered: Username: ${this.username}, Email: ${this.email}`);
    return true;
  }

  login(email: string, password: string): boolean {
    if (!email || !password) {
      console.log(`❌ Incorrect email or password: Try again.`);
      return false;
    }

    if (this.email === email && this.password === password) {
      this.isLoggedIn = true;
      console.log(`✅ Login success: ${this.username}`);
      return true;
    } else {
      console.log(`❌ Incorrect: email or password: Try again`);
      return false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    console.log(`👋 Logout: ${this.username}`);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  get isLoggedInStatus(): boolean {
    return this.isLoggedIn;
  }
}
