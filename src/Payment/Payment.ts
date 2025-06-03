export class Payment {
<<<<<<< HEAD
  
=======
>>>>>>> be14c2b7aefe7d11878ab82043b2e1943d595ef2
  id: number;
  orderId: number;
  amount: number;
  method: string;
  status: string;
  createdAt: Date;
  totalPrice: number;

<<<<<<< HEAD
  constructor(id: number, orderId: number, amount: number, method: string, createdAt: Date, totalPrice?: number) {
=======
  constructor(
    id: number,
    orderId: number,
    amount: number,
    method: string,
    totalPrice?: number
  ) {
>>>>>>> be14c2b7aefe7d11878ab82043b2e1943d595ef2
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
    this.method = method;
    this.status = "pending";
<<<<<<< HEAD
    this.createdAt = createdAt;
=======
    this.createdAt = new Date();
>>>>>>> be14c2b7aefe7d11878ab82043b2e1943d595ef2
    this.totalPrice = totalPrice ?? amount;
  }

  processPayment(): void {
    this.status = "completed";
  }

  refund(): void {
    this.status = "refunded";
  }
<<<<<<< HEAD
  
}
=======
}

>>>>>>> be14c2b7aefe7d11878ab82043b2e1943d595ef2
