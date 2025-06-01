import { User } from '../Customer/User';

export class Login {
  users: User[];

  constructor() {
    this.users = [];
  }

  authenticate(phoneNumber: string, password: string): User | null {
    const user = this.users.find(u => u.customer?.phoneNumber === phoneNumber || u.role === 'seller');
    if (user && password === 'pass') { // Simplified password check
      return user;
    }
    return null;
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}