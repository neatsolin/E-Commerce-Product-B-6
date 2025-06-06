import { Product } from '../Product/Product';
import { DeliveryOption } from '../Product/DeliveryOption';

export class CartItem {
    product: Product;
    quantity: number;
    deliveryOption: DeliveryOption | null;

    constructor(product: Product, quantity: number, deliveryOption?: DeliveryOption) {
        this.product = product;
        this.quantity = quantity;
        this.deliveryOption = deliveryOption || null;
    }
}