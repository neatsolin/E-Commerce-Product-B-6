export class Review {
  constructor(
    public id: number,
    public productId: number,
    public userId: string,
    public rating: number,
    public comment?: string
  ) { }
}