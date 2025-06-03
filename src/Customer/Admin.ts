import { Seller } from './Seller';

export class Admin {
  sellers: Seller[];

  constructor() {
    this.sellers = [];
  }

  addSeller(seller: Seller): void {
    this.sellers.push(seller);
  }

  getTotalStock(): { [productName: string]: number }[] {
    return this.sellers.map(seller => seller.getProductStock());
  }
}