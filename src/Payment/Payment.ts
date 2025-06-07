export class Payment {
  constructor(
    public id: number,
    public orderId: number,
    public amount: number,
    public method: string,
    public totalPrice?: number,
    public status: string = "pending"
  ) { }
}