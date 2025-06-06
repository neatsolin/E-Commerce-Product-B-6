export class Payment {
  constructor(
    public id: number,
    public orderId: number,
    public amount: number,
    public method: string,
    public totalPrice?: number
  ) {
    this.status = "Pending";
    this.createdAt = new Date();
  }
  public status: string;
  public createdAt: Date;
}