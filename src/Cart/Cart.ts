export class Cart {
  private items: { productId: number; quantity: number }[] = [];
  addItem(productId: number, quantity: number): void {
    const existingItem = this.items.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }
  }
  getItems(): { productId: number; quantity: number }[] {
    return [...this.items];
  }
}
