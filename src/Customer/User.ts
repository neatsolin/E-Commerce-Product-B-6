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
  private authenticated: boolean = false;

  constructor(
    private username: string,
    private email: string,
    private password: string,
    private address: string
  ) { }

  register(email: string, password: string): boolean {
    if (!this.authenticated) {
      this.authenticated = true;
      console.log(`${COLORS.GREEN}User ${this.username} registered successfully.${COLORS.RESET}`);
      return true;
    }
    return false;
  }

  login(email: string, password: string): boolean {
    if (email === this.email && password === this.password) {
      this.authenticated = true;
      console.log(`${COLORS.GREEN}Login success: ${COLORS.YELLOW}${this.username}${COLORS.RESET}`);
      return true;
    }
    console.log(`${COLORS.RED}Login failed for ${email}.${COLORS.RESET}`);
    return false;
  }

  isAuthenticated(): boolean { return this.authenticated; }
  getUsername(): string { return this.username; }
  getId(): string { return this.email; }
  getAddress(): string { return this.address; }
  setAddress(address: string): void { this.address = address; }
  logout(): void { this.authenticated = false; console.log(`${COLORS.YELLOW}Logged out ${this.username}.${COLORS.RESET}`); }
}

