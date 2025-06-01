import { Customer } from './Customer';
import { Seller } from './Seller';
import { Admin } from './Admin';
import { Address } from './Address';


export class User {
  role: string;
  customer?: Customer;
  seller?: Seller;
  admin?: Admin;

  constructor(role: string) {
    this.role = role;
    if (role === 'customer') this.customer = new Customer('', new Address('', '', '', '', ''));
    else if (role === 'seller') this.seller = new Seller();
    else if (role === 'admin') this.admin = new Admin();
  }
}