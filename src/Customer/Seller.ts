
import { Order } from "../Order/Order"; // Adjust path as needed
import { User } from "./User";

export class Seller extends User {
  private isPlatformSeller: boolean;

  constructor(
    username: string,
    email: string,
    password: string,
    address: string,
    isPlatformSeller: boolean
  ) {
    super(username, email, password, address);
    this.isPlatformSeller = isPlatformSeller;
  }
  public getProductStock(): { [productName: string]: number } {
    // This method should return the stock of products for this seller.
    // For now, we return an empty object as a placeholder.
    return {};
  }
  
}
