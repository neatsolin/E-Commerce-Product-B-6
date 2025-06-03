import { Order } from "../Order/Order";

export class PaymentGateway {
  process(order: Order, amount: number, method: string): boolean {
    // Simulate payment processing
    if (amount <= 0) return false;
    if (method === "credit card" || method === "debit card") {
      return Math.random() > 0.1; // 90% success rate
    }
    return false;
  }
}
