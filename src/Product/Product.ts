
export class Product {
  constructor(
    public id: number,
    public name: string,
    public category: string,
    public price: number,
    public stockQuantity: number,
    public sellerId: number,
    public discount?: number
  ) {}
}
