export class Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment?: string;

  constructor(
    id: number,
    productId: number,
    userId: number,
    rating: number,
    comment?: string
  ) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.rating = rating;
    this.comment = comment;
  }
}


