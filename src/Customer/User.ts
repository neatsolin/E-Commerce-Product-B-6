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
export class User {
  constructor(
    public username: string,
    public email: string,
    private password: string,
    private address: string
  ) {
    this.authenticated = false;
  }
  private authenticated: boolean;
  register(email: string, password: string): void {
    console.log(
      `${COLORS.GREEN}✅ Registered: Username: ${this.username}, Email: ${email}${COLORS.RESET}`
    );
  }
  login(email: string, password: string): boolean {
    if (email === this.email && password === this.password) {
      this.authenticated = true;
      console.log(`${COLORS.GREEN}✅ Login success: ${this.username}${COLORS.RESET}`);
      return true;
    }
    console.log(`${COLORS.RED}❌ Login failed.${COLORS.RESET}`);
    return false;
  }
  logout(): void {
    this.authenticated = false;
    console.log(`${COLORS.YELLOW}👋 Logout: ${this.username}${COLORS.RESET}`);
  }
  isAuthenticated(): boolean {
    return this.authenticated;
  }
  getId(): string {
    return this.username;
  }
  getUsername(): string {
    return this.username;
  }
  setAddress(address: string): void {
    this.address = address;
  }
  getAddress(): string {
    return this.address;
  }
}