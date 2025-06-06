import { User } from '../Auth/User';
import { Product } from '../Product/Product';
import { DeliveryOption } from '../Product/DeliveryOption';
import { CartItem } from './CartItem';
import { OrderItem } from '../Order/OrderItem';

export class Cart {
    cartID: string;
    customer: User;
    items: CartItem[];

    constructor(cartID: string, customer: User) {
        this.cartID = cartID;
        this.customer = customer;
        this.items = [];
    }

    addItem(product: Product, quantity: number, deliveryOption: DeliveryOption): void {
        const cartItem = new CartItem(product, quantity, deliveryOption);
        this.items.push(cartItem);
    }

    removeItem(cartItem: CartItem): void {
        this.items = this.items.filter(item => item !== cartItem);
    }

    getItems(): OrderItem[] {
        return this.items.map((item, index) => new OrderItem(
            `OI-${this.cartID}-${index + 1}`,
            item.product,
            item.quantity,
            // item.deliveryOption!
        ));
    }
}