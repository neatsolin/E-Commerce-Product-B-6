
import { Address } from '../Customer/Address';
import { Customer } from '../Customer/Customer';
import { User } from '../Customer/User';


export class Register {
  users: User[];

  constructor() {
    this.users = [];
  }

  register(phoneNumber: string, address: Address, role: string): User {
    const user = new User(role);
    if (role === 'customer') {
      user.customer = new Customer(phoneNumber, address);
    }
    this.users.push(user);
    return user;
  }
}