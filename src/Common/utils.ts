export function calculateTotal(items: any[], priceKey: string, quantityKey: string, discountKey?: string): number {
  return items.reduce((sum, item) => {
    const discount = discountKey ? (item[discountKey] || 0) : 0;
    return sum + (item[priceKey] * item[quantityKey] - discount);
  }, 0);
}